import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './models/task.model';
import { Model } from 'mongoose';
import { Available } from './models/available.model';
import { DateRange } from './interfaces/date-range.interface';

@Injectable()
export class TaskManagerService {
    constructor(
        @InjectModel('Task') private readonly taskModel: Model<Task>,
        @InjectModel('Available') private readonly availableModel: Model<Available>,
    ) {}

    async addTask(userId: string, taskName: string, dateRange: DateRange, startTime: string, endTime: string, includedDayIndex: Array<number>): Promise<Partial<any>> {
        console.log(dateRange);
        const startDate = dateRange.startDate;
        const endDate = dateRange.endDate;

        console.log('start date', startDate);
        console.log('end date', endDate);


        const date = new Date();
        const body: Partial<Task> = {
            userId,
            taskName,
            date,
            startTime,
            endTime,
            includedDayIndex,
        }

        // TODO ADD STUFF HERE 


        return undefined;
    }
}
