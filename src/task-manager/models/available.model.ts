import * as mongoose from 'mongoose';

export const AvailableSchema = new mongoose.Schema({
    userId: { type: String, defulat: '' },
    dateRange: [{ type: Date, default: Date.now() }],
    startTime: { type: String, default: '' },
    endTime: { type: String, default: '' },
    includedDayIndex: [ { type: Number } ]
});

export interface Available extends mongoose.Document {
    _id: string;
    userId: string;
    dateRange: Array<Date>;
    startTime: string;
    endTime: string;
    inculdeDayIndex: Array<number>;
}