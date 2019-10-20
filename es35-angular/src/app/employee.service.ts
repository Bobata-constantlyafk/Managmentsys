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
  addEmployee(employeeName) {
    const id: number = Employees[Employees.length - 1].id + 1;
    const name: string = employeeName;
    Employees.push(new Employee(id, name, 'Novakov'));
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.path + '?id=' + id);
  }
}
