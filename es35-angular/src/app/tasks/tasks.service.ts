import {Injectable, OnInit} from '@angular/core';
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

  removeTask(index): void {
    Tasks.splice(index, 1);
  }

  addTask(taskName) {
    const id: number = Tasks[Tasks.length - 1].id + 1;
    const name: string = taskName;
    Tasks.push(new Task(id, name));
  }
}
