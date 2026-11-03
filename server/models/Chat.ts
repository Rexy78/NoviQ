import mongoose, { Schema, Document } from 'mongoose';
import { isMongoDBConnected, memoryStore } from '../db.js';

export interface IChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface IChat extends Document {
  id: string;
  userId: string;
  analysisId?: string;
  messages: IChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema = new Schema<IChat>({
  userId: { type: String, required: true },
  analysisId: { type: String },
  messages: [
    {
      sender: { type: String, enum: ['user', 'assistant'], required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const MongooseChatModel = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);

export const ChatModel = {
  async findOne(query: Record<string, any>): Promise<IChat | null> {
    if (isMongoDBConnected()) {
      return await (MongooseChatModel as any).findOne(query);
    }
    const chats = memoryStore.get('chats') || [];
    return chats.find((c: any) => {
      if (query.userId && String(c.userId) === String(query.userId)) {
        if (query.analysisId && String(c.analysisId) === String(query.analysisId)) return true;
        if (!query.analysisId) return true;
      }
      return false;
    }) || null;
  },

  async findById(id: string): Promise<IChat | null> {
    if (isMongoDBConnected()) {
      return await (MongooseChatModel as any).findById(id);
    }
    const chats = memoryStore.get('chats') || [];
    return chats.find((c: any) => String(c._id || c.id) === String(id)) || null;
  },

  async find(query: Record<string, any> = {}): Promise<IChat[]> {
    if (isMongoDBConnected()) {
      return await (MongooseChatModel as any).find(query);
    }
    let chats = memoryStore.get('chats') || [];
    if (query.userId) {
      chats = chats.filter((c: any) => String(c.userId) === String(query.userId));
    }
    return chats;
  },

  async create(data: Partial<IChat>): Promise<IChat> {
    if (isMongoDBConnected()) {
      return await (MongooseChatModel as any).create(data);
    }
    const chats = memoryStore.get('chats') || [];
    const id = memoryStore.generateId();
    const newChat = {
      _id: id,
      id: id,
      userId: data.userId || '',
      analysisId: data.analysisId,
      messages: data.messages || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data
    };
    chats.push(newChat);
    memoryStore.set('chats', chats);
    return newChat as any;
  },

  async findByIdAndUpdate(id: string, updateData: any): Promise<any> {
    if (isMongoDBConnected()) {
      return await (MongooseChatModel as any).findByIdAndUpdate(id, updateData, { new: true });
    }
    const chats = memoryStore.get('chats') || [];
    const chatIndex = chats.findIndex((c: any) => String(c._id || c.id) === String(id));
    if (chatIndex !== -1) {
      chats[chatIndex] = {
        ...chats[chatIndex],
        ...updateData,
        updatedAt: new Date()
      };
      memoryStore.set('chats', chats);
      return chats[chatIndex];
    }
    return null;
  }
};
