import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Memory store fallback if MongoDB is not available locally or via URI
class LocalMemoryStore {
  private data: Record<string, any[]> = {
    users: [],
    resumes: [],
    analyses: [],
    chats: []
  };
  private dbPath: string;

  constructor() {
    this.dbPath = path.join(process.cwd(), 'data_store.json');
    this.load();
  }

  private load() {
    try {
      if (fs.existsSync(this.dbPath)) {
        const raw = fs.readFileSync(this.dbPath, 'utf8');
        this.data = JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not load local data store JSON:', e);
    }
  }

  private save() {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
    } catch (e) {
      console.warn('Could not save local data store JSON:', e);
    }
  }

  public get(collection: string) {
    if (!this.data[collection]) this.data[collection] = [];
    return this.data[collection];
  }

  public set(collection: string, items: any[]) {
    this.data[collection] = items;
    this.save();
  }

  public clearAll() {
    this.data = {
      users: [],
      resumes: [],
      analyses: [],
      chats: []
    };
    this.save();
  }

  public generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  }
}

export const memoryStore = new LocalMemoryStore();
let isMongoConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('ℹ️ MONGODB_URI not specified. Using embedded JSON data store.');
    return false;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log('✅ Connected to MongoDB via Mongoose');
    isMongoConnected = true;
    return true;
  } catch (err) {
    console.warn('⚠️ Could not connect to MongoDB:', err instanceof Error ? err.message : err);
    console.log('ℹ️ Falling back to embedded local data store.');
    isMongoConnected = false;
    return false;
  }
}

export function isMongoDBConnected() {
  return isMongoConnected;
}
