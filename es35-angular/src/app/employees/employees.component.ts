import {Component, OnInit} from '@angular/core';
import {Employee} from './employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [
    new Employee(1, 'Bobert', 'Williamson'),
    new Employee(68, 'Bjorg', 'Svenskeren'),
    new Employee(421, 'Strahomir', 'Bozhikravov'),
    new Employee(4, 'Monica', 'Bellucci'),
    new Employee(10, 'Himari', 'Nakamoto'),
    new Employee(7, 'Jordan', 'Jordanoff'),
    new Employee(8, 'Roza', 'Yordanova'),
  ];

  isEditing = false;
  show = false;
  currentElement;
  currentEmployee: Employee = new Employee(0, '', '');

  constructor() {}

  ngOnInit() {
    const addInput = document.getElementById('addInput') as HTMLInputElement;
    addInput.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        this.addEmployee(addInput);
      }
    });
  }

  addEmployee(input) {
    const name: string = input.value;
    const id = Math.max.apply(
      Math,
      this.employees.map((employee) => employee.id + 1)
    );
    const familyname: string = 'Novakov';
    this.employees.push(new Employee(id, name, familyname));
    input.value = '';
  }

  viewDetails(i) {
    this.show = true;
    this.currentEmployee = this.employees[i];
  }

  removeEmployee(event, id) {
    this.employees.splice(id, 1);
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
