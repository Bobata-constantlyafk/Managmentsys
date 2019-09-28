import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Task} from '../tasks.model';
import {TasksService} from '../tasks.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['../tasks.component.css', './task-add.component.css'],
})
export class TaskAddComponent implements OnInit {
  @Output() closeComp = new EventEmitter();
  task: Task;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {}

  addTask(title: HTMLInputElement, desc: HTMLInputElement) {
    const taskTitle = title.value;
    const taskDesc = desc.value;
    // const taskDepartment = dep.value;
    // const taskEmployee = emp.value;
    this.tasksService.addTask(taskTitle, taskDesc);
    // const createdTask = this.tasksService.getLastTask();
    this.close();
    // createdTask.assignDepartment(taskDepartment);
    title.value = '';
    desc.value = '';
  }

  close() {
    this.closeComp.emit();
  }
}
