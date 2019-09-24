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

  isEditing = false;

  show = false;

  currentElement;

  currentTask: Task = new Task(0, '');

  constructor() {}

  ngOnInit() {
    const addInput = document.getElementById('addInput') as HTMLInputElement;
    addInput.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        this.addTask(addInput);
      }
    });
  }

  removeTask(event, id) {
    this.tasks.splice(id, 1);
  }

  addTask(input) {
    const name: string = input.value;
    const id: number = this.tasks[this.tasks.length - 1].id + 1;
    this.tasks.push(new Task(id, name));
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
