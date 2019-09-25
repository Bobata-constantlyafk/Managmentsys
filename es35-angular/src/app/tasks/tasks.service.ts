import {Injectable} from '@angular/core';
import {Task} from './tasks.model';
import {Tasks} from './mock-tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {}

  getTasks(): Task[] {
    return Tasks;
  }

  // getTasksOfDepartment(depId: number): Task[] {
  //   return Tasks.filter((task) => task.department.id === depId);
  // }

  // getTasksOfEmployee(empId: number): Task[] {
  //   return Tasks.filter((task) => task.employees);
  // }

  removeTask(index: number): void {
    Tasks.splice(index, 1);
  }

  addTask(taskTitle: string, taskDesc): void {
    const id: number = Tasks[Tasks.length - 1].id + 1;
    Tasks.push(new Task(id, taskTitle, taskDesc));
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
