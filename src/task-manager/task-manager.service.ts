import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);

        console.log('start date', startDate);
        console.log('end date', endDate);

        if (!endDate) {
            const task: Partial<Task> = {
                userId,
                taskName,
                date: startDate,
                startTime,
                endTime,
            }
    
            return await this.taskModel.create(task).then(async (newTask: Task) => {
                const response = { message: 'Task Created Successfully' };
                // return success message
                return null;
            }).catch(err => { 
                throw new InternalServerErrorException({ message: `Error creating task ${err}`}); 
            });
        } else {
            // console.log(endDate.getDate() - startDate.getDate());
            // double check this
            const lengthOfDays = endDate.getDate() - startDate.getDate() + 1;

            for (let i = 0; i < lengthOfDays; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + i);

                const dateIncluded = includedDayIndex.filter(dayIndex => dayIndex === date.getDay());
                if (dateIncluded.length === 1) {
                    console.log('dateIncluded', dateIncluded);

                    const task: Partial<Task> = {
                        userId,
                        taskName,
                        date,
                        startTime,
                        endTime,
                    }

                    const newTask = await this.taskModel.create(task).then(async (newTask: Task) => {
                        return newTask;
                    }).catch(err => { 
                        throw new InternalServerErrorException({ message: `Error creating task for week ${err}`}); 
                    });

                    console.log('NEWtASK', newTask);
                }

            }

            // return success message
            return null;
        }
    }
}
