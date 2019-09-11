import {Component, OnInit} from '@angular/core';
import {Task} from './tasks.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [
    {name: 'Task1'},
    {name: 'Task2'},
    {name: 'Task3'},
    {name: 'Task4'},
  ];

  constructor() {}

  ngOnInit() {}
}
