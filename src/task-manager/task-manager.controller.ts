import { Controller, Post, Body } from '@nestjs/common';
import { TaskManagerService } from './task-manager.service';
import { DateRange } from './interfaces/date-range.interface';

@Controller('task-manager')
export class TaskManagerController {
    constructor(private readonly taskmangerService: TaskManagerService) {}

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
}
