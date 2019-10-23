import {Injectable} from '@angular/core';
import {Employee} from './employees/employee';
import {Employees} from './employees/employees-mock';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  path = 'http://i875395.hera.fhict.nl/api/3561763/employee';
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.path);
  }
  // getEmployees(): Employee[] {
  //   return Employees;
  // }
  removeEmployee(index): void {
    Employees.splice(index, 1);
  }
  getLastEmployee(): Employee {
    return Employees[Employees.length - 1];
  }

  getEmployeesOfDepartment(depId: number): Employee[] {
    return Employees.filter((employee) => employee.department.id === depId);
  }

  addEmployee(employeeName: string, employeeLastName: string) {
    const id: number = Employees[Employees.length - 1].id + 1;
    Employees.push(new Employee(id, employeeName, employeeLastName));
    return Employees[id - 1];
  }
}
