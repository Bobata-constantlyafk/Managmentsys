import {Component, OnInit} from '@angular/core';
import {Task} from './tasks.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [
    new Task(1, 'Task1'),
    new Task(2, 'Task2'),
    new Task(3, 'Task3'),
    new Task(4, 'Task4'),
  ];

  show = false;

  currentTask: Task = new Task(0, '');

  constructor() {}

  ngOnInit() {}

  removeTask(event, id) {
    this.tasks.splice(id, 1);
  }

  addTask(input) {
    const name: string = input.value;
    const id = Math.max.apply(Math, this.tasks.map((task) => task.id));
    this.tasks.push(new Task(id, name));
    input.value = '';
  }

  viewDetails(event, i) {
    this.show = true;
    this.currentTask = this.tasks[i];
  }

  off() {
    this.show = false;
  }
}
