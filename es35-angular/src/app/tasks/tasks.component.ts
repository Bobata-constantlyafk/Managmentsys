import {Component, OnInit, Output} from '@angular/core';
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
  taskToView: any;

  searchTerm: string;

  showDetails: boolean;
  showOverlay: boolean;
  showAddForm: boolean;

  currentTask: Task;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.showDetails = false;
    this.showOverlay = false;
    this.showAddForm = false;
  }

  removeTask(i: number) {
    const taskId = this.tasks[i].id;
    this.tasksService.removeTask(taskId);
    this.tasks.splice(i, 1);
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
        this.tasksService.editTaskTitle(
          this.currentTask,
          this.currentTask.name
        );
        el.removeEventListener('focusout', handler);
      };
      el.addEventListener('focusout', handler);
    }, 1);
  }

  closeAddTaskDialog(taskAdded: boolean) {
    this.showAddForm = false;
    if (!taskAdded) {
      return;
    }
    this.tasksService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  closeDetails() {
    this.showDetails = false;
    this.showOverlay = false;
  }

  viewAddForm(): void {
    this.showOverlay = true;
    this.showAddForm = true;
  }

  closeAddForm(): void {
    this.showOverlay = false;
    this.showAddForm = false;
  }

  closeEverything(): void {
    this.showOverlay = false;
    this.showAddForm = false;
    this.showDetails = false;
  }

  viewDetails(i) {
    this.showDetails = true;
    this.showOverlay = true;
    this.taskToView = {task: this.tasks[i], index: i};
  }

  search(s: string) {
    let tasks = [];
    this.tasksService.getTasks().subscribe((data) => {
      tasks = data;
      const filter = s.toUpperCase();
      this.tasks = tasks.filter(
        (task) => task.name.toUpperCase().indexOf(filter) > -1 // ||
        // task.description.toUpperCase().indexOf(filter) > -1
      );
    });
  }
}
