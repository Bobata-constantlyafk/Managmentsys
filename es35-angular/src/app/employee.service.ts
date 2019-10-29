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

  getEmployeesByDep(): Observable<Employee[]> {
    const dict = {};
    const subject = new Subject<any>();
    this.getEmployees().subscribe((employees) => {
      employees.forEach((employee) => {
        const dep = employee.department_id;
        console.log(dep);
        const depkeys = Object.keys(dict);
        if (!(dep in dict)) {
          dict[dep] = 1;
        } else {
          dict[dep]++;
        }
      });
      subject.next(dict);
    });
    return subject.asObservable();
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
    // tslint:disable-next-line:variable-name
    department_id: number,
    firstname: string,
    lastname: string,
    birthdate: string
  ): Observable<any> {
    return this.http.post(this.path, {
      department_id,
      firstname,
      lastname,
      birthdate,
    });
  }

  // tslint:disable-next-line:variable-name
  editEmployeeName(employee: Employee, first_name: string): void {
    employee.first_name = first_name;
    this.http
      .put(this.path, {name: first_name}, {params: {id: String(employee.id)}})
      .subscribe();
  }

  getLastEmployee(): Employee {
    return Employees[Employees.length - 1];
  }
}
