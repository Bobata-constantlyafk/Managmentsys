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
  getLastEmployee(): Employee {
    return Employees[Employees.length - 1];
  }

  getTasksOfDepartment(depId: number): Employee[] {
    return Employees.filter((employee) => employee.department.id === depId);
  }

  addEmployee(employeeName: string, employeeLastName: string) {
    const id: number = Employees[Employees.length - 1].id + 1;
    Employees.push(new Employee(id, employeeName, employeeLastName));
    return Employees[id - 1];
  }
}
