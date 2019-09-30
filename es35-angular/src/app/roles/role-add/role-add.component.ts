import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Role} from '../role';
import {RolesService} from '../roles.service';
import {Department} from 'src/app/department';
import {EmployeeService} from 'src/app/employee.service';
import {Employee} from 'src/app/employees/employee';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['../roles.component.css', './role-add.component.css'],
})
export class roleAddComponent implements OnInit {
  @Output() closeComp = new EventEmitter();
  role: Role;
  departments: Department[];
  employees: Employee[];

  constructor(
    private rolesService: RolesService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }

  addrole(
    title: HTMLInputElement,
    desc: HTMLInputElement,
    emp: HTMLInputElement
  ) {
    const roleTitle = title.value;
    const roleDesc = desc.value;
    if (roleTitle === '' || roleDesc === '') {
      alert('Fill all');
      return;
    }

    // const roleDepartment = dep.value;
    const roleEmployee = emp.value;
    const employee = this.employeeService
      .getEmployees()
      .filter((empl) => empl.name === roleEmployee)[0];
    this.rolesService.addRole(roleTitle, roleDesc);
    // const createdrole = this.rolesService.getLastrole();
    this.rolesService.getLastRole().assignEmployee(employee);
    this.close();
    // createdrole.assignDepartment(roleDepartment);
    title.value = '';
    desc.value = '';
  }

  close() {
    this.closeComp.emit();
  }
}
