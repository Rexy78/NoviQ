import mongoose, { Schema, Document } from 'mongoose';
import { isMongoDBConnected, memoryStore } from '../db.js';

export interface IAnalysis extends Document {
  id: string;
  userId: string;
  resumeId: string;
  targetRole: string;
  resumeFileName?: string;
  rawText?: string;

  overallScore: number;
  overallScoreExplanation: string;

  atsScore: number;
  atsRiskLevel: 'Excellent' | 'Good' | 'Moderate Risk' | 'High Risk' | 'Critical Risk';
  atsBreakdown: {
    keywordMatch: { score: number; details: string; matchedSkills: string[]; missingSkills: string[]; status: string };
    structure: { score: number; details: string; sections: Array<{ name: string; status: string; recommendation: string }>; status: string };
    formatting: { score: number; details: string; checks: Array<{ name: string; status: string; note: string }>; status: string };
    parsing: { score: number; details: string; detectedFields: Record<string, any>; status: string };
  };

  skillAnalysis: {
    currentMatchPct: number;
    strongSkills: string[];
    partialSkills: string[];
    missingSkills: string[];
    categories: Array<{
      categoryName: string;
      skills: Array<{ skillName: string; status: 'Strong' | 'Needs Improvement' | 'Missing'; importance: string; evidence: string }>;
    }>;
  };

  projectAnalysis: {
    relevanceScore: number;
    technicalDepthScore: number;
    technologyDiversityScore: number;
    bestProject: string;
    missingProjectTypes: string[];
    projects: Array<{
      title: string;
      relevance: string;
      complexity: string;
      techStack: string[];
      strengths: string;
      weaknesses: string;
      suggestedImprovement: string;
    }>;
  };

  experienceAnalysis: {
    relevanceScore: number;
    depthScore: number;
    totalYearsExtracted: number;
    highlights: string[];
  };

  xaiExplanations: {
    whatWasMeasured: string;
    whyScore: string;
    evidenceFound: string[];
    missingElements: string[];
    howToImprove: string[];
  };

  roadmapStages: Array<{
    stageName: string;
    timeframe: string;
    skillsToFocus: string[];
    recommendedAction: string;
    expectedMilestone: string;
  }>;

  courseRecommendations: Array<{
    title: string;
    platform: string;
    skillAddressed: string;
    level: string;
    duration: string;
    whyRecommended: string;
    link: string;
  }>;

  createdAt: Date;
  updatedAt: Date;
}

const AnalysisSchema = new Schema<IAnalysis>({
  userId: { type: String, required: true },
  resumeId: { type: String, required: true },
  targetRole: { type: String, required: true },
  resumeFileName: { type: String },
  rawText: { type: String },

  overallScore: { type: Number, default: 70 },
  overallScoreExplanation: { type: String },

  atsScore: { type: Number, default: 70 },
  atsRiskLevel: { type: String, default: 'Moderate Risk' },
  atsBreakdown: { type: Schema.Types.Mixed },

  skillAnalysis: { type: Schema.Types.Mixed },
  projectAnalysis: { type: Schema.Types.Mixed },
  experienceAnalysis: { type: Schema.Types.Mixed },
  xaiExplanations: { type: Schema.Types.Mixed },
  roadmapStages: { type: Schema.Types.Mixed },
  courseRecommendations: { type: Schema.Types.Mixed },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const MongooseAnalysisModel = mongoose.models.Analysis || mongoose.model<IAnalysis>('Analysis', AnalysisSchema);

export const AnalysisModel = {
  async findOne(query: Record<string, any>): Promise<IAnalysis | null> {
    if (isMongoDBConnected()) {
      return await (MongooseAnalysisModel as any).findOne(query);
    }
    const items = memoryStore.get('analyses') || [];
    return items.find((a: any) => {
      if (query.userId && String(a.userId) === String(query.userId)) return true;
      if (query._id && String(a._id || a.id) === String(query._id)) return true;
      return false;
    }) || null;
  },

  async findById(id: string): Promise<IAnalysis | null> {
    if (isMongoDBConnected()) {
      return await (MongooseAnalysisModel as any).findById(id);
    }
    const items = memoryStore.get('analyses') || [];
    return items.find((a: any) => String(a._id || a.id) === String(id)) || null;
  },

  async find(query: Record<string, any> = {}): Promise<IAnalysis[]> {
    if (isMongoDBConnected()) {
      return await (MongooseAnalysisModel as any).find(query).sort({ createdAt: -1 });
    }
    let items = memoryStore.get('analyses') || [];
    if (query.userId) {
      items = items.filter((a: any) => String(a.userId) === String(query.userId));
    }
    items.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return items;
  },

  async create(data: Partial<IAnalysis>): Promise<IAnalysis> {
    if (isMongoDBConnected()) {
      return await (MongooseAnalysisModel as any).create(data);
    }
    const items = memoryStore.get('analyses') || [];
    const id = memoryStore.generateId();
    const newDoc = {
      _id: id,
      id: id,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data
    };
    items.push(newDoc);
    memoryStore.set('analyses', items);
    return newDoc as any;
  },

  async findByIdAndDelete(id: string): Promise<any> {
    if (isMongoDBConnected()) {
      return await (MongooseAnalysisModel as any).findByIdAndDelete(id);
    }
    let items = memoryStore.get('analyses') || [];
    items = items.filter((a: any) => String(a._id || a.id) !== String(id));
    memoryStore.set('analyses', items);
    return { success: true };
  }
};
