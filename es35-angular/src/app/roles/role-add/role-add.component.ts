import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Role} from '../role';
import {RolesService} from '../roles.service';
import {Department} from 'src/app/department';
import {EmployeeService} from 'src/app/employee.service';
import {Employee} from 'src/app/employees/employee';
import {DepartmentService} from 'src/app/departments/department.service';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['../roles.component.css', './role-add.component.css'],
})
export class RoleAddComponent implements OnInit {
  @Output() closeComp = new EventEmitter();
  role: Role;
  departments: Department[];
  employees: Employee[];

  constructor(
    private rolesService: RolesService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
    this.departments = this.departmentService.getDepartments();
  }

  addRole(
    title: HTMLInputElement,
    desc: HTMLInputElement,
    dep: HTMLInputElement,
    emp: HTMLInputElement
  ) {
    const roleTitle = title.value;
    const roleDesc = desc.value;
    if (roleTitle === '' || roleDesc === '') {
      alert('Fill all');
      return;
    }

    const createdRole = this.rolesService.addRole(roleTitle, roleDesc);
    console.log(createdRole);

    // Assing employee
    const roleEmployee = emp.value;
    const employee = this.employeeService
      .getEmployees()
      .filter((empl) => empl.name === roleEmployee)[0];
    createdRole.assignEmployee(employee);

    // Assign Department
    const roleDepartment = dep.value;
    const department = this.departmentService
      .getDepartments()
      .filter((depa) => depa.name === roleDepartment)[0];
    createdRole.assignDepartment(department);

    this.close();

    title.value = '';
    desc.value = '';
  }

  close() {
    this.closeComp.emit();
  }
}
