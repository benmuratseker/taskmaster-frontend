import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8080/api";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [
      {
        id: 1,
        name: 'Design wireframe',
        description: '',
        completed: false,
        dueDate: new Date('2025-01-15'),
        project: 1,
      },
      {
        id: 2,
        name: 'Develop frontend',
        description: '',
        completed: true,
        dueDate: new Date('2025-01-05'),
        project: 1,
      },
      {
        id: 3,
        name: 'Develop backend',
        description: '',
        completed: false,
        dueDate: new Date('2025-01-10'),
        project: 1,
      },
    ];

  constructor(private http: HttpClient) { }

  //get tasks
  // getTasks(){
  //   return this.tasks;
  // }
  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${BASE_URL}/tasks`);
  }

  //add task
  // addTask(task: Task){
  //   this.tasks.push(task);
  //   return this.tasks;
  // }
  addTask(task: Task){
    return this.http.post(`${BASE_URL}/tasks`,{...task});
  }

  //update task
  // updateTask(newTask: Task){
  //   const taskIndex = this.tasks.findIndex((task) => task.id === newTask.id);
  //   this.tasks[taskIndex] = newTask;
  //   return this.tasks;

  // }
  updateTask(newTask: Task){
    return this.http.put(`${BASE_URL}/tasks/${newTask.id}`, {...newTask})

  }

  //delete task
  // deleteTask(id: number){
  //   const taskIndex = this.tasks.findIndex((task) => task.id === id);
  //   this.tasks.splice(taskIndex, 1);
  //   return this.tasks;
  // }
  deleteTask(id: number){
    return this.http.delete(`${BASE_URL}/tasks/${id}`);
  }
}
