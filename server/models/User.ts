import mongoose, { Schema, Document } from 'mongoose';
import { isMongoDBConnected, memoryStore } from '../db.js';

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  profileRole?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  profileRole: { type: String, default: 'Software Engineer' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const MongooseUserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export const UserModel = {
  async findOne(query: Record<string, any>): Promise<IUser | null> {
    if (isMongoDBConnected()) {
      return await (MongooseUserModel as any).findOne(query);
    }
    const users = memoryStore.get('users') || [];
    const found = users.find((u: any) => {
      if (query.email && u.email?.toLowerCase() === String(query.email).toLowerCase()) return true;
      if (query._id && String(u._id || u.id) === String(query._id)) return true;
      return false;
    });
    return found || null;
  },

  async findById(id: string): Promise<IUser | null> {
    if (isMongoDBConnected()) {
      return await (MongooseUserModel as any).findById(id);
    }
    const users = memoryStore.get('users') || [];
    return users.find((u: any) => String(u._id || u.id) === String(id)) || null;
  },

  async find(query: Record<string, any> = {}): Promise<IUser[]> {
    if (isMongoDBConnected()) {
      return await (MongooseUserModel as any).find(query);
    }
    return memoryStore.get('users') || [];
  },

  async create(data: Partial<IUser>): Promise<IUser> {
    if (isMongoDBConnected()) {
      return await (MongooseUserModel as any).create(data);
    }
    const users = memoryStore.get('users') || [];
    const id = memoryStore.generateId();
    const newUser = {
      _id: id,
      id: id,
      name: data.name || '',
      email: data.email || '',
      passwordHash: data.passwordHash || '',
      profileRole: data.profileRole || 'Software Engineer',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data
    };
    users.push(newUser);
    memoryStore.set('users', users);
    return newUser as any;
  },

  async findByIdAndUpdate(id: string, updateData: any): Promise<IUser | null> {
    if (isMongoDBConnected()) {
      return await (MongooseUserModel as any).findByIdAndUpdate(id, updateData, { new: true });
    }
    const users = memoryStore.get('users') || [];
    const idx = users.findIndex((u: any) => String(u._id || u.id) === String(id));
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updateData, updatedAt: new Date() };
      memoryStore.set('users', users);
      return users[idx] as any;
    }
    return null;
  },

  async findByIdAndDelete(id: string): Promise<any> {
    if (isMongoDBConnected()) {
      return await (MongooseUserModel as any).findByIdAndDelete(id);
    }
    let users = memoryStore.get('users') || [];
    users = users.filter((u: any) => String(u._id || u.id) !== String(id));
    memoryStore.set('users', users);
    return { success: true };
  },

  async deleteMany(query: Record<string, any> = {}): Promise<any> {
    if (isMongoDBConnected()) {
      return await (MongooseUserModel as any).deleteMany(query);
    }
    memoryStore.set('users', []);
    return { success: true };
  }
};
