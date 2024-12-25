import { Component, inject } from '@angular/core';
import { Task } from '../../task.model';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  
  //dummy data for dynamic data load
  // tasks: Task[] = [
  //   {
  //     id: 1,
  //     name: 'Design wireframe',
  //     description: '',
  //     completed: false,
  //     dueDate: new Date('2025-01-15'),
  //     project: 1,
  //   },
  //   {
  //     id: 2,
  //     name: 'Develop frontend',
  //     description: '',
  //     completed: true,
  //     dueDate: new Date('2025-01-05'),
  //     project: 1,
  //   },
  //   {
  //     id: 3,
  //     name: 'Develop backend',
  //     description: '',
  //     completed: false,
  //     dueDate: new Date('2025-01-10'),
  //     project: 1,
  //   },
  // ];

  tasks: Task[] =[];
  
  private taskService = inject(TaskService);

  constructor() {
    this.tasks = this.taskService.getTasks();
  }

  handleCheckbox(id: number){
    //console.log(id);
    const taskIndex = this.tasks.findIndex((task) => task.id == id);
    const updatedTask = this.tasks[taskIndex];
    updatedTask.completed = !updatedTask.completed
    //this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
    this.tasks = this.taskService.updateTask(updatedTask);
  }
}
