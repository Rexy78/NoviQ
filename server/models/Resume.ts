import mongoose, { Schema, Document } from 'mongoose';
import { isMongoDBConnected, memoryStore } from '../db.js';

export interface IResume extends Document {
  id: string;
  userId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  rawText: string;
  parsedData?: any;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema<IResume>({
  userId: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, default: 'application/pdf' },
  fileSize: { type: Number, default: 0 },
  rawText: { type: String, required: true },
  parsedData: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const MongooseResumeModel = mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);

export const ResumeModel = {
  async findOne(query: Record<string, any>): Promise<IResume | null> {
    if (isMongoDBConnected()) {
      return await (MongooseResumeModel as any).findOne(query);
    }
    const resumes = memoryStore.get('resumes') || [];
    return resumes.find((r: any) => {
      if (query.userId && String(r.userId) === String(query.userId)) return true;
      if (query._id && String(r._id || r.id) === String(query._id)) return true;
      return false;
    }) || null;
  },

  async findById(id: string): Promise<IResume | null> {
    if (isMongoDBConnected()) {
      return await (MongooseResumeModel as any).findById(id);
    }
    const resumes = memoryStore.get('resumes') || [];
    return resumes.find((r: any) => String(r._id || r.id) === String(id)) || null;
  },

  async find(query: Record<string, any> = {}): Promise<IResume[]> {
    if (isMongoDBConnected()) {
      return await (MongooseResumeModel as any).find(query);
    }
    const resumes = memoryStore.get('resumes') || [];
    if (query.userId) {
      return resumes.filter((r: any) => String(r.userId) === String(query.userId));
    }
    return resumes;
  },

  async create(data: Partial<IResume>): Promise<IResume> {
    if (isMongoDBConnected()) {
      return await (MongooseResumeModel as any).create(data);
    }
    const resumes = memoryStore.get('resumes') || [];
    const id = memoryStore.generateId();
    const newResume = {
      _id: id,
      id: id,
      userId: data.userId || '',
      fileName: data.fileName || 'resume.pdf',
      fileType: data.fileType || 'application/pdf',
      fileSize: data.fileSize || 0,
      rawText: data.rawText || '',
      parsedData: data.parsedData || {},
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data
    };
    resumes.push(newResume);
    memoryStore.set('resumes', resumes);
    return newResume as any;
  }
};
