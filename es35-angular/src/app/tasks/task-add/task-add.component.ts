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
  departments: Department[];
  employees: Employee[];

  constructor(
    private tasksService: TasksService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }

  addTask(
    title: HTMLInputElement,
    desc: HTMLInputElement,
    emp: HTMLInputElement,
    deadline: HTMLInputElement
  ) {
    const taskTitle = title.value;
    const taskDesc = desc.value;
    const taskDeadline = deadline.value;
    if (taskTitle === '' || taskDesc === '' || taskDeadline === '') {
      alert('Fill all');
      return;
    }

    // const taskDepartment = dep.value;
    const taskEmployee = emp.value;
    const employee = this.employeeService
      .getEmployees()
      .filter((empl) => empl.name === taskEmployee)[0];
    this.tasksService.addTask(taskTitle, taskDesc);
    // const createdTask = this.tasksService.getLastTask();
    this.tasksService.getLastTask().assignEmployee(employee);
    this.close();
    // createdTask.assignDepartment(taskDepartment);
    this.tasksService.getLastTask().assignDeadline(taskDeadline);

    title.value = '';
    desc.value = '';
    deadline.value = '';
  }

  close() {
    this.closeComp.emit();
  }
}
