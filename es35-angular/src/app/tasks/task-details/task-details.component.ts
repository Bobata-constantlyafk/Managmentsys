import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Task} from '../tasks.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['../tasks.component.css', './task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  @Output() closeComp = new EventEmitter();
  @Input() task: Task;

  constructor() {}

  ngOnInit() {}

  close() {
    this.closeComp.emit();
  }
}
