import * as mongoose from 'mongoose';

export const AvailableSchema = new mongoose.Schema({
    userId: { type: String, defulat: '' },
    date: { type: Date, default: Date.now() },
    startTime: { type: String, default: '' },
    endTime: { type: String, default: '' },
});

export interface Available extends mongoose.Document {
    _id: string;
    userId: string;
    date: Date;
    startTime: string;
    endTime: string;
}