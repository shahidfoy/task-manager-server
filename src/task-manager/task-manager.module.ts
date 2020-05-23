import { Module } from '@nestjs/common';
import { TaskManagerController } from './task-manager.controller';
import { TaskManagerService } from './task-manager.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './models/task.model';
import { AvailableSchema } from './models/available.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema },
      { name: 'Available', schema: AvailableSchema },
    ]),
  ],
  controllers: [TaskManagerController],
  providers: [TaskManagerService]
})
export class TaskManagerModule {}
