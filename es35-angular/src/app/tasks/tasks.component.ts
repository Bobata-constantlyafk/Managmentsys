import {Component, OnInit} from '@angular/core';
import {Task} from './tasks.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [
    {id: 1, name: 'Task1'},
    {id: 2, name: 'Task2'},
    {id: 3, name: 'Task3'},
    {id: 4, name: 'Task4'},
  ];

  constructor() {}

  ngOnInit() {}

  removeTask(id) {
    this.tasks.splice(id, 1);
  }

  addTask(input) {
    const name: string = input.value;
    const id = Math.max.apply(Math, this.tasks.map((task) => task.id));
    this.tasks.push(new Task(id, name));
    input.value = '';
  }
}
