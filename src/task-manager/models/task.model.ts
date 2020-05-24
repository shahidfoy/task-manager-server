import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
    userId: { type: String, default: '' },
    taskName: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    startTime: { type: String, default: '' },
    endTime: { type: String, default: '' },
});

export interface Task extends mongoose.Document {
    _id: string;
    userId: string;
    taskName: string;
    date: Date;
    startTime: string,
    endTime: string,
}