import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Department} from 'src/app/department';
import {DepartmentService} from 'src/app/departments/department.service';
import {EmployeeService} from 'src/app/employee.service';
import {Employee} from 'src/app/employees/employee';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['../departments.component.css', './department-add.component.css'],
})
export class DepartmentAddComponent implements OnInit {
  @Output() closeComp = new EventEmitter();
  department: Department;
  employees: Employee[];

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employeeService
      .getEmployees()
      .subscribe((employees) => (this.employees = employees));
  }

  // addDep(name: HTMLInputElement, emp: HTMLInputElement) {
  //   console.log(name);
  //   const depName = name.value;
  //   if (depName === '') {
  //     alert('Fill all');
  //     return;
  //   }

  //   const depEmployee = emp.value;
  //   const employee = this.employeeService
  //     .getEmployees()
  //     .filter((employee1) => employee1.name === depEmployee)[0];

  //   this.departmentService.addDep(depName);
  //   this.departmentService.getLastDep().assignEmployee(employee);
  //   this.close();
  // }

  close() {
    this.closeComp.emit();
  }
}
