import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {EmployeeService} from 'src/app/employee.service';
import {Employee} from '../employee';
import {Department} from 'src/app/department';
import {DepartmentService} from 'src/app/departments/department.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css', '../employees.component.css'],
})
export class EmployeeAddComponent implements OnInit {
  @Output() closeComp = new EventEmitter();
  employee: Employee;
  employees: Employee[];
  departments: Department[];

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.departmentService
      .getDepartments()
      .subscribe((departments) => (this.departments = departments));

    this.employeeService
      .getEmployees()
      .subscribe((employees) => (this.employees = employees));
  }
  addEmployee(
    firstname: HTMLInputElement,
    lastname: HTMLInputElement,
    bday: HTMLInputElement,
    dep: HTMLInputElement
  ) {
    const employeeName = firstname.value;
    const employeeLastName = lastname.value;
    const employeeDepartment = dep.value;
    const employeeBirthday = bday.value;
    if (
      employeeName === '' ||
      employeeLastName === '' ||
      employeeBirthday === ''
    ) {
      alert('Please input the information properly');
      return;
    }

    // Assign Department
    this.departmentService
      .getDepartmentIdByName(employeeDepartment)
      .subscribe((depId) => {
        console.log(depId, employeeName, employeeLastName, employeeBirthday);
        const a = this.employeeService.addEmployee(
          depId,
          employeeName,
          employeeLastName,
          employeeBirthday
        );
        a.subscribe((x) => this.close());
      });
  }
  close() {
    this.closeComp.emit();
  }
}
