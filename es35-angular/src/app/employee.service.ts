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
}
