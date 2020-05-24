import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
    userId: { type: String, default: '' },
    taskName: { type: String },
    date: { type: Date, default: Date.now() },
    startTime: { type: String, default: '' },
    endTime: { type: String, default: '' },
    includedDayIndex: [ { type: Number } ]
});

export interface Task extends mongoose.Document {
    _id: string;
    userId: string;
    taskName: string;
    date: Date;
    startTime: string,
    endTime: string,
    includedDayIndex: Array<number>;
}