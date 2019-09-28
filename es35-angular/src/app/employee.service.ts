import {Injectable} from '@angular/core';
import {Employee} from './employees/employee';
import {Employees} from './employees/employees-mock';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}
  getEmployees(): Employee[] {
    return Employees;
  }
  removeEmployee(index): void {
    Employees.splice(index, 1);
  }
  addEmployee(employeeName) {
    const id: number = Employees[Employees.length - 1].id + 1;
    const name: string = employeeName;
    Employees.push(new Employee(id, name, 'Novakov'));
  }
}
