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
  employeeservice: EmployeeService;
  isEditing = false;
  show = false;
  currentElement;
  currentEmployee: Employee = new Employee(0, '', '');

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
<<<<<<< HEAD
=======
    this.employees = this.employeeService.getEmployees();
>>>>>>> dev
    const addInput = document.getElementById('addInput') as HTMLInputElement;
    addInput.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        this.addEmployee(addInput);
      }
    });
  }

  addEmployee(input) {
    const employeeName = input.value;
    this.employeeService.addEmployee(employeeName);
    input.value = '';
  }

  viewDetails(i) {
    this.show = true;
    this.currentEmployee = this.employees[i];
  }

<<<<<<< HEAD
  removeEmployee(event, id) {
    this.employees.splice(id, 1);
=======
  removeEmployee(id) {
    this.employeeService.removeEmployee(id);
>>>>>>> dev
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
        el.removeEventListener('focusout', handler);
      };
      el.addEventListener('focusout', handler);
    }, 1);
  }

  off() {
    this.show = false;
  }
}
