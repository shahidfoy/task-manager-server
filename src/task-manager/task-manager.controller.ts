import { Controller, Post, Body } from '@nestjs/common';
import { TaskManagerService } from './task-manager.service';

@Controller('task-manager')
export class TaskManagerController {
    constructor(private readonly taskmangerService: TaskManagerService) {}

    @Post('add-task')
    async addTask(
        @Body('taskName') taskName: string,
        @Body('taskName') dateRange: Array<Date>,
        @Body('taskName') startTime: string,
        @Body('taskName') endTime: string,
        @Body('taskName') includedDays: Array<number>,
    ): Promise<Partial<any>> {
        return this.taskmangerService.addTask('', taskName, dateRange, startTime, endTime, includedDays);
    }
}
