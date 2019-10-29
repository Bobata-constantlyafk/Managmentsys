import {Injectable} from '@angular/core';
import {Employee} from './employees/employee';
import {Employees} from './employees/employees-mock';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  path = 'http://i875395.hera.fhict.nl/api/3561763/employee';
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.path);
  }
  // Get an employee using his id
  getEmployeeById(id: number): Observable<Employee> {
    const subject = new Subject<Employee>();
    this.http
      .get<Employee>(this.path, {params: {id: String(id)}})
      .subscribe((employee) => {
        subject.next(employee);
      });
    return subject.asObservable();
  }

  removeEmployee(id: number): void {
    this.http.delete(this.path, {params: {id: String(id)}}).subscribe();
  }

  addEmployee(
    employeeid: number,
    firstname: string,
    lastname: string,
    birthdate: string
  ): Observable<any> {
    return this.http.post(this.path, {
      employeeid,
      firstname,
      lastname,
      birthdate,
    });
  }

  getLastEmployee(): Employee {
    return Employees[Employees.length - 1];
  }
}
