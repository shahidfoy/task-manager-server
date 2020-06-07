import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TaskManagerService } from './task-manager.service';
import { DateRange } from './interfaces/date-range.interface';

@Controller('task-manager')
export class TaskManagerController {
    constructor(private readonly taskmangerService: TaskManagerService) {}

    @Post('set-available')
    async setAvailable(
        @Body('dateRange') dateRange: DateRange,
        @Body('startTime') startTime: string,
        @Body('endTime') endTime: string,
        @Body('includedDayIndex') includedDayIndex: Array<number>,
    ): Promise<Partial<any>> {
        return this.taskmangerService.addAvailabile('tester', dateRange, startTime, endTime, includedDayIndex);
    }

    @Post('add-task')
    async addTask(
        @Body('taskName') taskName: string,
        @Body('dateRange') dateRange: DateRange,
        @Body('startTime') startTime: string,
        @Body('endTime') endTime: string,
        @Body('includedDayIndex') includedDayIndex: Array<number>,
    ): Promise<Partial<any>> {
        return this.taskmangerService.addTask('tester', taskName, dateRange, startTime, endTime, includedDayIndex);
    }

    @Get('user-tasks/:startDate/:endDate')
    async getUserTasks(
        @Param('startDate') startDate: any,
        @Param('endDate') endDate: any,
    ): Promise<Partial<any>> {
        console.log('START DATE', startDate);
        console.log('END DATE', endDate);
        const dateRange = {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        };
        return this.taskmangerService.getUserTasks('tester', dateRange);
    }

    @Get('user-availablity/:startDate/:endDate')
    async getUserAvailablity(
        @Param('startDate') startDate: any,
        @Param('endDate') endDate: any,
    ): Promise<Partial<any>> {
        console.log('START DATE', startDate);
        console.log('END DATE', endDate);
        const dateRange = {
            startDate,
            endDate
        };
        return this.taskmangerService.getUserAvailablity('tester', dateRange);
    }
}
