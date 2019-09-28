import {Component, OnInit} from '@angular/core';
import {Task} from './tasks.model';
import {TasksService} from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  isEditing = false;

  show = false;

  currentTask: Task = new Task(0, '');

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();

    const addInput = document.getElementById('addInput') as HTMLInputElement;
    addInput.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        this.addTask(addInput);
      }
    });
  }

  removeTask(id) {
    this.tasksService.removeTask(id);
  }

  addTask(input) {
    const taskName = input.value;
    this.tasksService.addTask(taskName);
    input.value = '';
  }

  viewDetails(i) {
    this.show = true;
    this.currentTask = this.tasks[i];
  }

  editTask(id) {
    this.currentTask = this.tasks[id];
    this.currentTask.toggleEdit();
    setTimeout(() => {
      const el = document.getElementById('taskEditInput') as HTMLInputElement;
      el.focus();
      el.select();
      el.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
          this.currentTask.toggleEdit();
          el.removeEventListener('focusout', handler);
        }
      });
      const handler = (event) => {
        this.currentTask.toggleEdit();
        el.removeEventListener('focusout', handler);
      };
      el.addEventListener('focusout', handler);
    }, 1);
  }

  off() {
    this.show = false;
  }
}
