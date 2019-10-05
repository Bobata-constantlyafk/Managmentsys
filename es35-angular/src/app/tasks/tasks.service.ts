import {Injectable} from '@angular/core';
import {Task} from './tasks.model';
import {Tasks} from './mock-tasks';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {TaskDetailsComponent} from './task-details/task-details.component';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  path = 'http://i875395.hera.fhict.nl/api/402384/task';
  constructor(private http: HttpClient) {}

  getTasks(): Task[] {
    return Tasks;
  }

  getTaskByIndex(index: number): Task {
    return Tasks[index];
  }

  getLastTask(): Task {
    return Tasks[Tasks.length - 1];
  }

  getTasksOfDepartment(depId: number): Task[] {
    return Tasks.filter((task) => task.department.id === depId);
  }

  getTasksOfEmployee(empId: number): Task[] {
    const tasks: Task[] = new Array();
    Tasks.forEach((task) => {
      task.employees.forEach((emp) => {
        if (emp.id === empId) {
          tasks.push(task);
        }
      });
    });
    return tasks;
  }

  removeTask(index: number): void {
    Tasks.splice(index, 1);
  }

  addTask(taskTitle: string, taskDesc: string, deadline: string): Task {
    const id: number = Tasks[Tasks.length - 1].id + 1;
    Tasks.push(new Task(id, taskTitle, taskDesc, deadline));
    return Tasks[id - 1];
  }

  editTaskTitle(index: number, title: string): void {
    const task = Tasks[index];
    task.title = title;
  }

  editTaskDescription(index: number, description: string): void {
    const task = Tasks[index];
    task.description = description;
  }
}
