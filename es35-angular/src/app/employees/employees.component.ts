import {Component, OnInit} from '@angular/core';
import {Employee} from './employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  isEditing = false;

  showDetails: boolean;
  showOverlay: boolean;
  showAddForm: boolean;

  currentEmployee: Employee = new Employee(0, '', '');

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
    this.showDetails = false;
    this.showOverlay = false;
    this.showAddForm = false;
  }

  removeEmployee(id) {
    this.employeeService.removeEmployee(id);
  }

  viewDetails(i) {
    this.showDetails = true;
    this.showOverlay = true;
    this.currentEmployee = this.employees[i];
  }

  // editEmployee(id) {
  //   this.currentEmployee = this.employees[id];
  //   this.currentEmployee.toggleEdit();
  //   setTimeout(() => {
  //     const el = document.getElementById(
  //       'employeeEditInput'
  //     ) as HTMLInputElement;
  //     el.focus();
  //     el.select();
  //     el.addEventListener('keydown', (event) => {
  //       if (event.keyCode === 13) {
  //         this.currentEmployee.toggleEdit();
  //         el.removeEventListener('focusout', handler);
  //       }
  //     });
  //     const handler = (event) => {
  //       this.currentEmployee.toggleEdit();
  //       el.removeEventListener('focusout', handler);
  //     };
  //     el.addEventListener('focusout', handler);
  //   }, 1);
  // }

  closeDetails() {
    this.showDetails = false;
    this.showOverlay = false;
  }

  viewAddForm(): void {
    this.showOverlay = true;
    this.showAddForm = true;
  }

  closeAddForm(): void {
    this.showOverlay = false;
    this.showAddForm = false;
  }

  closeEverything(): void {
    this.showOverlay = false;
    this.showAddForm = false;
    this.showDetails = false;
  }
}
