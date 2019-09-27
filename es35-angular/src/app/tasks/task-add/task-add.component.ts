import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Task} from '../tasks.model';
import {TasksService} from '../tasks.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css', '../tasks.component.css'],
})
export class TaskAddComponent implements OnInit {
  @Output() taskAdded: EventEmitter<Task>;
  task: Task;
  taskService: TasksService;
  constructor() {}

  ngOnInit() {
    this.taskAdded = new EventEmitter<Task>();
  }

  addTask(
    title: HTMLInputElement,
    desc: HTMLInputElement,
    dep: HTMLInputElement,
    emp: HTMLInputElement
  ) {
    const taskTitle = title.value;
    const taskDesc = desc.value;
    const taskDepartment = dep.value;
    const taskEmployee = emp.value;
    this.taskService.addTask(taskTitle, taskDesc);
    const createdTask = this.taskService.getLastTask();
    // createdTask.assignDepartment(taskDepartment);
  }
}
