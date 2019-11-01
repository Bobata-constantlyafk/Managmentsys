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
    this.departments = this.departmentService.getDepartments();
    this.employees = this.employeeService.getEmployees();
  }
  addEmployee(
    name: HTMLInputElement,
    lastname: HTMLInputElement,
    dep: HTMLInputElement
  ) {
    const employeeName = name.value;
    const employeeLastName = lastname.value;
    if (employeeName === '' || employeeLastName === '') {
      alert('Please assign the information properly');
      return;
    }

    const createdEmployee = this.employeeService.addEmployee(
      employeeName,
      employeeLastName
      // employeeLastName
    );
    console.log(createdEmployee);

    // Assign Department
    const employeeDepartment = dep.value;
    const department = this.departmentService
      .getDepartments()
      .filter((depa) => depa.name === employeeDepartment)[0];
    createdEmployee.assignDepartment(department);

    this.close();

    name.value = '';
    lastname.value = '';
  }
  close() {
    this.closeComp.emit();
  }
}
