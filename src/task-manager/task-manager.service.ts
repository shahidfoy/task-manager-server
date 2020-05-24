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

    async addAvailabile(userId: string, dateRange: DateRange, startTime: string, endTime: string, includedDayIndex: Array<number>): Promise<Partial<any>> {
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);

        if (!dateRange.startDate) {
            throw new InternalServerErrorException({ message: 'starting date not set.' });
        }

        if (!dateRange.endDate) {
            const available: Partial<Available> = {
                userId,
                date: startDate,
                startTime,
                endTime,
            }
    
            return await this.availableModel.create(available).then(async (newAvailable: Task) => {
                return { message: 'availability created' };
            }).catch(err => { 
                throw new InternalServerErrorException({ message: `Error creating availability ${err}`}); 
            });
        } else {
            const lengthOfDays = this.differenceInDays(startDate, endDate) + 1;
            let availabilityCountsCreated = 0;

            for (let i = 0; i < lengthOfDays; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + i);

                const dateIncluded = includedDayIndex.filter(dayIndex => dayIndex === date.getDay());
                if (dateIncluded.length === 1) {
                    const available: Partial<Available> = {
                        userId,
                        date,
                        startTime,
                        endTime,
                    }

                    await this.availableModel.create(available).then(async (newAvailable: Task) => {
                        availabilityCountsCreated++;
                    }).catch(err => { 
                        throw new InternalServerErrorException({ message: `Error setting availability ${err}`}); 
                    });
                }
            }
            return { message: `${availabilityCountsCreated} availbility status created` };
        }
    }

    async addTask(userId: string, taskName: string, dateRange: DateRange, startTime: string, endTime: string, includedDayIndex: Array<number>): Promise<Partial<any>> {
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);

        if (!dateRange.startDate) {
            throw new InternalServerErrorException({ message: 'starting date not set.' });
        }

        if (!dateRange.endDate) {
            const task: Partial<Task> = {
                userId,
                taskName,
                date: startDate,
                startTime,
                endTime,
            }
    
            return await this.taskModel.create(task).then(async (newTask: Task) => {
                return { message: 'new task created' };
            }).catch(err => { 
                throw new InternalServerErrorException({ message: `Error creating task ${err}`}); 
            });
        } else {
            const lengthOfDays = this.differenceInDays(startDate, endDate) + 1;;
            let tasksCreated = 0;

            for (let i = 0; i < lengthOfDays; i++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + i);

                const dateIncluded = includedDayIndex.filter(dayIndex => dayIndex === date.getDay());
                if (dateIncluded.length === 1) {
                    const task: Partial<Task> = {
                        userId,
                        taskName,
                        date,
                        startTime,
                        endTime,
                    }

                    await this.taskModel.create(task).then(async (newTask: Task) => {
                        tasksCreated++;
                    }).catch(err => { 
                        throw new InternalServerErrorException({ message: `Error creating task for week ${err}`}); 
                    });
                }
            }
            return { message: `${tasksCreated} new tasks created` };
        }
    }

    private differenceInDays(firstDate: any, secondDate: any) {
        return Math.round((secondDate - firstDate) / (1000 * 3600 * 24));

        // length of days for each month
        // january: 31
        // febuary: 28 - 29
        // march: 31
        // april: 30
        // may: 31
        // june: 30
        // july: 31
        // august: 31
        // september: 30
        // october: 31
        // november: 30
        // december: 31
    }
}
