import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';
import { Task } from './task.model';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  imports: [MongooseModule.forFeature([Task.featureConfig])],
  controllers: [TaskController],
  providers: [TaskRepository, TaskService],
  exports: [TaskService],
})
export class ApiTaskModule {}
