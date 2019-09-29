import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Task} from '../tasks.model';
import {TasksService} from '../tasks.service';
import {Department} from 'src/app/department';
import {EmployeeService} from 'src/app/employee.service';
import {Employee} from 'src/app/employees/employee';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['../tasks.component.css', './task-add.component.css'],
})
export class TaskAddComponent implements OnInit {
  @Output() closeComp = new EventEmitter();
  task: Task;
  departments: string[];
  employees: string[];

  constructor(
    private tasksService: TasksService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const tmp = this.employeeService
      .getEmployees()
      .filter((employee) => employee.name);
    console.log(tmp);
    // this.employees = tmp;
  }

  addTask(title: HTMLInputElement, desc: HTMLInputElement) {
    const taskTitle = title.value;
    const taskDesc = desc.value;
    if (taskTitle === '' || taskDesc === '') {
      alert('Fill all');
      return;
    }

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
