import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './models/task.model';
import { Model } from 'mongoose';
import { Available } from './models/available.model';

@Injectable()
export class TaskManagerService {
    constructor(
        @InjectModel('Task') private readonly taskModel: Model<Task>,
        @InjectModel('Available') private readonly availableModel: Model<Available>,
    ) {}

    async addTask(userId: string, taskName: string, dateRange: Array<Date>, startTime: string, endTime: string, includedDays: Array<number>): Promise<Partial<any>> {
        // TODO ADD STUFF HERE 
        return undefined;
    }
}
