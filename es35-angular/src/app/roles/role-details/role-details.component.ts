import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Role} from '../role';
import {RolesService} from '../roles.service';
import {Employee} from 'src/app/employees/employee';
import {EmployeeService} from 'src/app/employee.service';
@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['../roles.component.css', './role-details.component.css'],
})
export class RoleDetailsComponent implements OnInit {
  @Output() closeComp = new EventEmitter();
  @Input() role: Role;

  employees: Employee[];
  selectedEmp: Employee;
  allEmployees: Employee[];

  constructor(
    private rolesService: RolesService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employeeService
      .getEmployees()
      .subscribe((employees) => (this.employees = employees));
    this.employees = [];
    for (const employee of this.employees) {
      if (this.role.employees.indexOf(employee) < 0) {
        this.employees.push(employee);
      }
    }
  }

  close() {
    this.closeComp.emit();
  }

  seeEmpRoles(empId) {
    console.log(this.rolesService.getRolesOfEmployee(empId));
  }

  // addEmp(empName: string) {
  //   if (empName === '') {
  //     return;
  //   }
  //   const selectedEmp = this.employeeService
  //     .getEmployees()
  //     .filter((employee) => employee.name === empName)[0];
  //   this.role.assignEmployee(selectedEmp);
  //   this.employees.splice(this.employees.indexOf(selectedEmp), 1);
  // }

  removeEmp(empIndex) {
    this.employees.push(this.role.employees[empIndex]);
    this.role.employees.splice(empIndex, 1);
  }
}
