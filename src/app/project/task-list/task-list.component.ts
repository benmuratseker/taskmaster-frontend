import { Component, inject } from '@angular/core';
import { Task } from '../../task.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TaskService } from '../../Services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { filter, map, Observable } from 'rxjs';

const emptyTask = {
    name: "",
    description: "",
    completed: false,
    dueDate: new Date(),
    project: 0,
    id: 0
};

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe, TaskFormComponent, AsyncPipe],
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
  showModal = false;
  selectedTask: Task = emptyTask;
  formType: "CREATE" | "UPDATE" = "CREATE"
  tasks$!: Observable<Task[]>
  
  private taskService = inject(TaskService);

  constructor() {
    //this.tasks = this.taskService.getTasks();
    this.updateTasks();
  }

  updateTasks(){
    this.tasks$ = this.taskService.getTasks();
  }

  handleCheckbox(id: number){
    debugger;
    console.log(id);
    // const taskIndex = this.tasks.findIndex((task) => task.id == id);
    const taskIndex = this.tasks.findIndex((task) => task.id == id);
    const updatedTask = this.tasks[taskIndex];
    updatedTask.completed = !updatedTask.completed
    //this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
    // this.tasks = this.taskService.updateTask(updatedTask);

    this.taskService.updateTask(updatedTask);
  }

  deleteTask(id: number){
    //this.tasks = this.taskService.deleteTask(id);
    this.taskService.deleteTask(id).subscribe(() => {
      this.updateTasks();
    })
  }

  updateTask(task: Task){
    //set selected task
    this.selectedTask = task;
    //set the form type (Update)
    this.formType = "UPDATE";
    //open the modal
    this.showModal = true;
  }

  handleModalClose(type: 'SUBMIT' | 'CANCEL'){
    if (type === 'SUBMIT') {
      this.updateTasks();
    }

    this.showModal = false;
  }
}
