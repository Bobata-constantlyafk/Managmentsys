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
    this.employees = this.employeeService.getEmployees();
    this.departments = this.departmentService.getDepartments();
  }

  addTask(
    title: HTMLInputElement,
    desc: HTMLInputElement,
    dep: HTMLInputElement,
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
    const createdTask = this.tasksService.addTask(
      taskTitle,
      taskDesc,
      taskDeadline
    );
    console.log(createdTask);

    // Assing employee
    const taskEmployee = emp.value;
    const employee = this.employeeService
      .getEmployees()
      .filter((empl) => empl.name === taskEmployee)[0];
    createdTask.assignEmployee(employee);

    // Assing Deadline
    createdTask.assignDeadline(taskDeadline);

    // Assign Department
    const taskDepartment = dep.value;
    const department = this.departmentService
      .getDepartments()
      .filter((depa) => depa.name === taskDepartment)[0];
    createdTask.assignDepartment(department);

    this.close();

    title.value = '';
    desc.value = '';
    deadline.value = '';
  }

  close() {
    this.closeComp.emit();
  }
}
