import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Task} from '../tasks.model';
import {TasksService} from '../tasks.service';
import {Department} from 'src/app/department';
import {EmployeeService} from 'src/app/employee.service';
import {Employee} from 'src/app/employees/employee';
import {DepartmentService} from 'src/app/departments/department.service';

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
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.employeeService
      .getEmployees()
      .subscribe((employees) => (this.employees = employees));
    // Populate the departments
    this.departmentService
      .getDepartments()
      .subscribe((departments) => (this.departments = departments));
  }

  addTask(
    dep: HTMLInputElement,
    title: HTMLInputElement,
    desc: HTMLInputElement,
    deadline: HTMLInputElement
  ) {
    const taskTitle = title.value;
    const taskDeadline = deadline.value;
    const taskDescription = desc.value;
    const taskDepartment = dep.value;
    if (taskTitle === '' || taskDeadline === '' || taskDescription === '') {
      alert('Fill all');
      return;
    }

    // Assign Department
    this.departmentService
      .getDepartmentIdByName(taskDepartment)
      .subscribe((depId) => {
        console.log(depId, taskTitle, taskDescription, taskDeadline);
        const a = this.tasksService.addTask(
          depId,
          taskTitle,
          taskDescription,
          taskDeadline
        );
        a.subscribe((x) => this.close(true));
      });
  }

  close(taskAdded: boolean) {
    this.closeComp.emit(taskAdded);
  }
}
