import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
    userId: { type: String, default: '' },
    taskName: { type: String, required: true },
    dateRange: [{ type: Date, default: Date.now() }],
    startTime: { type: String, default: '' },
    endTime: { type: String, default: '' },
    includedDays: [ { type: Number } ]
});

export interface Task extends mongoose.Document {
    _id: string;
    userId: string;
    taskName: string;
    dateRange: Array<Date>;
    startTime: string,
    endTime: string,
    includeDays: Array<number>;
}