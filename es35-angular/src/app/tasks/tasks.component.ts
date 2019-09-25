import {Component, OnInit} from '@angular/core';
import {Task} from './tasks.model';
import {TasksService} from './tasks.service';
import {Employee} from '../employees/employee';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  isEditing = false;

  showDetails = false;

  currentTask: Task = new Task(0, '', '');

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();

    const addInput = document.getElementById('addInput') as HTMLInputElement;
    const taskTitle = addInput.value;
    // addInput.addEventListener('keydown', (event) => {
    //   if (event.keyCode === 13) {
    //     this.tasksService.addTask(taskTitle, );
    //   }
    // });
  }

  removeTask(id) {
    this.tasksService.removeTask(id);
  }

  addTask(titleInput: HTMLInputElement, descInput: HTMLInputElement): void {
    const taskTitle = titleInput.value;
    const taskDesc = descInput.value;
    this.tasksService.addTask(taskTitle, taskDesc);
    titleInput.value = '';
    descInput.value = '';
  }

  viewDetails(i) {
    this.showDetails = true;
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

  closeDetails() {
    this.showDetails = false;
  }
}
