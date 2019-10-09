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
    dep: HTMLInputElement,
    emp: HTMLInputElement,
    deadline: HTMLInputElement
  ) {
    const taskTitle = title.value;
    const taskDeadline = deadline.value;
    if (taskTitle === '' || taskDeadline === '') {
      alert('Fill all');
      return;
    }

    // Assign Department
    const taskDepartment = dep.value;
    const depId = this.departmentService.getDepartmentIdByName(taskDepartment);

    // const taskDepartment = dep.value;
    this.tasksService.addTask(taskTitle, taskDeadline, depId);
    this.tasksService.getLastTask().subscribe((task) => {
      // Assing employee
      const taskEmployee = emp.value;
      const employee = this.employeeService
        .getEmployees()
        .filter((empl) => empl.name === taskEmployee)[0];
      task.assignEmployee(employee);

      // Assing Deadline
      task.assignDeadline(taskDeadline);
    });

    this.close();

    title.value = '';
    deadline.value = '';
  }

  close() {
    this.closeComp.emit();
  }
}
