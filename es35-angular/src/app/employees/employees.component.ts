import {Component, OnInit} from '@angular/core';
import {Employee} from './employee';
import {EmployeeService} from '../employee.service';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  isEditing = false;

  searchTerm: string;

  showDetails: boolean;
  showOverlay: boolean;
  showAddForm: boolean;

  currentEmployee: Employee;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService
      .getEmployees()
      .subscribe((employees) => (this.employees = employees));

    this.employeeService
      .getEmployeesByDep()
      .subscribe((employees) => console.log(employees));

    this.showDetails = false;
    this.showOverlay = false;
    this.showAddForm = false;
  }

  removeEmployee(i: number) {
    const employeeId = this.employees[i].id;
    this.employeeService.removeEmployee(employeeId);
    this.employees.splice(i, 1);
  }

  viewDetails(i) {
    this.showDetails = true;
    this.showOverlay = true;
    this.currentEmployee = this.employees[i];
  }

  editEmployee(id) {
    this.currentEmployee = this.employees[id];
    this.currentEmployee.toggleEdit();
    setTimeout(() => {
      const el = document.getElementById(
        'employeeEditInput'
      ) as HTMLInputElement;
      el.focus();
      el.select();
      el.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
          this.currentEmployee.toggleEdit();
          el.removeEventListener('focusout', handler);
        }
      });
      const handler = (event) => {
        this.currentEmployee.toggleEdit();
        // Ако ще има други методи за едитване,
        // предполагам че точно ей тука трябва да се наместят.
        this.employeeService.editEmployeeName(
          this.currentEmployee,
          this.currentEmployee.first_name
        );
        el.removeEventListener('focusout', handler);
      };
      el.addEventListener('focusout', handler);
    }, 1);
  }

  closeAddEmployeeDialog() {
    this.showAddForm = false;
    this.employeeService
      .getEmployees()
      .subscribe((employees) => (this.employees = employees));
  }

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

  search(s: string) {
    let employees = [];
    this.employeeService.getEmployees().subscribe((data) => {
      employees = data;
      const filter = s.toUpperCase();
      this.employees = employees.filter(
        (employee) => employee.name.toUpperCase().indexOf(filter) > -1
      );
    });
  }
}
