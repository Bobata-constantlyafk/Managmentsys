import {Component, OnInit} from '@angular/core';
import {TasksService} from '../tasks/tasks.service';
import {DepartmentService} from '../departments/department.service';
import {EmployeeService} from '../employee.service';
import {RolesService} from '../roles/roles.service';
import {Tasks} from '../tasks/mock-tasks';
import {Task} from '../tasks/tasks.model';
import {Department} from '../department';
import {Employee} from '../employees/employee';
import {Role} from '../roles/role';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../tasks/tasks.component.css', './dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  all;
  tasks: Task[];
  departments: Department[];
  employees: Employee[];
  roles: Role[];
  searchTerm: string;

  selectedOption;

  option;

  constructor(
    private tasksService: TasksService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private roleService: RolesService
  ) {}

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
    this.departments = this.departmentService.getDepartments();
    this.employees = this.employeeService.getEmployees();
    this.roles = this.roleService.getRoles();
  }

  updateView(option) {
    switch (option) {
      case 'tasks':
        this.selectedOption = this.tasks;
        break;
      case 'departments':
        this.selectedOption = this.departments;
        break;
      case 'employees':
        this.selectedOption = this.employees;
        break;
      case 'roles':
        this.selectedOption = this.roles;
        break;
    }
  }

  isTask(candidate) {
    return candidate instanceof Task;
  }

  isDepartment(candidate) {
    return candidate instanceof Department;
  }

  isEmployee(candidate) {
    return candidate instanceof Employee;
  }

  isRole(candidate) {
    return candidate instanceof Role;
  }
}
