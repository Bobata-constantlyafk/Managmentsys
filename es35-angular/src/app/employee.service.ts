import {Injectable} from '@angular/core';
import {Employee} from './employees/employee';
import {Employees} from './employees/employees-mock';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  path = 'http://i875395.hera.fhict.nl/api/3497186/employee';
  constructor(private http: HttpClient) {}
  getEmployees(): Employee[] {
    return Employees;
  }
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
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.path + '?id=' + id);
  }
}
