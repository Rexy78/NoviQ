import { Router, Response } from 'express';
import multer from 'multer';
import mammoth from 'mammoth';
import * as pdfParseModule from 'pdf-parse';
import { ResumeModel } from '../models/Resume.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export function normalizeSpacedHeadings(text: string): string {
  if (!text) return text;
  return text.replace(/\b([A-Z])\s+([A-Z])\s+([A-Z])\s+([A-Z])(?:\s+([A-Z]))*(?:\s+([A-Z]))*(?:\s+([A-Z]))*(?:\s+([A-Z]))*(?:\s+([A-Z]))*(?:\s+([A-Z]))*(?:\s+([A-Z]))*(?:\s+([A-Z]))*\b/g, (match) => {
    const chars = match.replace(/\s+/g, '');
    const knownHeaders = [
      'EXPERIENCE', 'INTERNSHIPS', 'CONTACT', 'SKILLS', 'LANGUAGES',
      'CERTIFICATIONS', 'CERTIFICATION', 'PROJECTS', 'EDUCATION',
      'PATENTS', 'SUMMARY', 'PUBLICATIONS', 'ACHIEVEMENTS', 'AWARDS',
      'VOLUNTEER', 'COURSES', 'LICENSES', 'PROFILE'
    ];
    if (knownHeaders.includes(chars)) {
      return chars;
    }
    return match;
  });
}

function checkReadableResumeContent(text: string): boolean {
  if (!text) return false;
  const words = text.match(/[a-zA-Z]{2,}/g) || [];
  return words.length >= 10;
}

function extractPdfStreamText(buffer: Buffer): string {
  try {
    const str = buffer.toString('binary');
    const matches: string[] = [];
    const tjRegex = /\(([^)]+)\)\s*Tj/g;
    let m;
    while ((m = tjRegex.exec(str)) !== null) {
      if (m[1]) matches.push(m[1]);
    }
    const tjArrRegex = /\[\s*((?:\([^)]*\)\s*)*)\]\s*TJ/g;
    while ((m = tjArrRegex.exec(str)) !== null) {
      const inner = m[1].match(/\(([^)]*)\)/g);
      if (inner) {
        matches.push(inner.map(s => s.slice(1, -1)).join(''));
      }
    }
    return matches.join(' ');
  } catch (e) {
    return '';
  }
}

async function extractPdfText(buffer: Buffer, fileName: string, fileType: string, fileSize: number): Promise<string> {
  const isPdfMime = fileType.toLowerCase().includes('pdf') || fileName.toLowerCase().endsWith('.pdf');
  console.log('--- [PDF EXTRACTION DIAGNOSTIC] ---');
  console.log(`1. Uploaded File Name: ${fileName}`);
  console.log(`2. Uploaded File MIME Type: ${fileType}`);
  console.log(`3. Uploaded File Size: ${fileSize} bytes`);
  console.log(`4. Recognized as PDF: ${isPdfMime}`);

  let methodUsed = 'None';
  let rawExtracted = '';

  // Method 1: pdf-parse v2 PDFParse class
  if (pdfParseModule && pdfParseModule.PDFParse) {
    try {
      methodUsed = 'pdf-parse PDFParse Class';
      const parser = new pdfParseModule.PDFParse({ data: buffer });
      const res = await parser.getText();
      if (typeof res === 'string') {
        rawExtracted = res;
      } else if (res && typeof res.text === 'string') {
        rawExtracted = res.text;
      } else if (res && Array.isArray(res.pages)) {
        rawExtracted = res.pages.map((p: any) => p.text || '').join('\n');
      }
      console.log(`5. Extraction Method Executed: ${methodUsed}`);
    } catch (e: any) {
      console.warn(`Extraction with ${methodUsed} failed:`, e?.message || e);
    }
  }

  // Method 2: pdf-parse v1 function fallback
  if (!rawExtracted.trim()) {
    try {
      let fn: any = pdfParseModule;
      if (fn && typeof fn !== 'function' && typeof fn.default === 'function') {
        fn = fn.default;
      }
      if (typeof fn === 'function') {
        methodUsed = 'pdf-parse Function';
        const parsed = await fn(buffer);
        if (parsed && typeof parsed.text === 'string') {
          rawExtracted = parsed.text;
        }
        console.log(`5. Extraction Method Executed: ${methodUsed}`);
      }
    } catch (e: any) {
      console.warn('pdf-parse function fallback failed:', e?.message || e);
    }
  }

  // Method 3: Stream Regex Extraction fallback
  if (!rawExtracted.trim() || !checkReadableResumeContent(rawExtracted)) {
    const streamText = extractPdfStreamText(buffer);
    if (streamText && checkReadableResumeContent(streamText)) {
      rawExtracted = streamText;
      console.log('5. Extraction Method Executed: PDF Stream Fallback');
    }
  }

  // Clean extracted text (remove page markers & non-printable control chars)
  const cleanText = rawExtracted
    .replace(/\n*--\s*\d+\s*of\s*\d+\s*--\n*/gi, '\n')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const isReadable = checkReadableResumeContent(cleanText);

  console.log(`6. Extracted Text Length: ${cleanText.length} characters`);
  console.log(`7. Contains Readable Resume Content: ${isReadable}`);
  console.log('-----------------------------------');

  if (!isReadable || cleanText.length < 20) {
    throw new Error(
      "Your PDF appears to be image-based, scanned, or empty. We couldn't extract readable text. Please upload a text-based PDF or paste your resume text directly."
    );
  }

  return normalizeSpacedHeadings(cleanText);
}

// Upload and parse resume
router.post('/upload', authMiddleware, upload.single('resumeFile'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    let rawText = '';
    let fileName = 'resume.pdf';
    let fileType = 'application/pdf';
    let fileSize = 0;

    if (req.file) {
      fileName = req.file.originalname;
      fileType = req.file.mimetype || '';
      fileSize = req.file.size;

      const isPdf = fileType.includes('pdf') || fileName.toLowerCase().endsWith('.pdf') || req.file.buffer.slice(0, 4).toString() === '%PDF';

      if (isPdf) {
        rawText = await extractPdfText(req.file.buffer, fileName, fileType, fileSize);
      } else if (fileType.includes('word') || fileName.toLowerCase().endsWith('.docx') || fileName.toLowerCase().endsWith('.doc')) {
        try {
          const docxResult = await mammoth.extractRawText({ buffer: req.file.buffer });
          rawText = normalizeSpacedHeadings(docxResult.value || '');
        } catch (mErr) {
          const textStr = req.file.buffer.toString('utf-8').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ');
          if (checkReadableResumeContent(textStr)) {
            rawText = normalizeSpacedHeadings(textStr);
          } else {
            throw new Error('Could not extract text from Word document. Please convert it to a text-based PDF or paste the text directly.');
          }
        }
      } else {
        const textStr = req.file.buffer.toString('utf-8').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ');
        if (!checkReadableResumeContent(textStr)) {
          throw new Error('The file uploaded does not contain sufficient readable text. Please upload a text-based PDF or DOCX file.');
        }
        rawText = normalizeSpacedHeadings(textStr);
      }
    } else if (req.body && req.body.resumeText) {
      rawText = normalizeSpacedHeadings(req.body.resumeText);
      fileName = 'Pasted_Resume_Snippet.txt';
      fileType = 'text/plain';
      fileSize = Buffer.byteLength(rawText, 'utf-8');
    } else {
      res.status(400).json({ error: 'Please upload a resume file or paste resume text' });
      return;
    }

    if (!rawText || !rawText.trim() || !checkReadableResumeContent(rawText)) {
      res.status(400).json({ error: 'Could not extract readable text from the provided resume.' });
      return;
    }

    // Save resume to DB / memory store
    const resume = await ResumeModel.create({
      userId: req.user.userId,
      fileName,
      fileType,
      fileSize,
      rawText: rawText.trim(),
      parsedData: {
        characterCount: rawText.length,
        wordCount: rawText.trim().split(/\s+/).length
      }
    });

    const resumeIdStr = String(resume._id || resume.id);

    res.json({
      message: 'Resume uploaded and parsed successfully',
      resume: {
        id: resumeIdStr,
        _id: resumeIdStr,
        fileName: resume.fileName,
        wordCount: resume.parsedData?.wordCount || 0
      }
    });

  } catch (err: any) {
    console.error('Resume parse error:', err);
    res.status(500).json({ error: err.message || 'Failed to process resume document.' });
  }
});

// Fetch all resumes for user
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const resumes = await ResumeModel.find({ userId: req.user.userId });
    res.json({ resumes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user resumes' });
  }
});

export default router;
