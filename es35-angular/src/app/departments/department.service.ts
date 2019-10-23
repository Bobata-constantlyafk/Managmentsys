import {Injectable} from '@angular/core';
import {Department} from '../department';
import {DEPARTMENTS} from '../mock-departments';
import {Employee} from '../employees/employee';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  path = 'http://i875395.hera.fhict.nl/api/3497186/department';
  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.path);
  }

  getDepByIndex(index: number): Observable<Department> {
    const subject = new Subject<Department>();
    this.http
      .get<Department>(this.path, {params: {id: String(index)}})
      .subscribe((department) => {
        subject.next(department);
      });
    return subject.asObservable();
  }

  // getDepByName(name: string): Department {
  //   return this.getDepartments().filter(
  //     (department) => department.name === name
  //   )[0];
  // }

  getLastDep(): Observable<Department> {
    const subject = new Subject<Department>();
    this.getDepartments().subscribe((departments) => {
      subject.next(departments[departments.length - 1]);
    });
    return subject.asObservable();
  }

  removeDep(id: number) {
    this.http.delete(this.path, {params: {id: String(id)}}).subscribe();
  }

  addDep(name: string, building: string): Observable<any> {
    return this.http.post(this.path, {
      name,
      building,
    });
  }

  editDepName(index: number, title: string): void {
    const department = DEPARTMENTS[index];
    department.name = title;
    this.http.put(this.path, {name: title}).subscribe();
  }

  // getEmployeesOfDepId(depId: number): Employee[] {
  //   // return Tasks.filter((task) =>
  //   //   task.employees.filter((employee) => employee.id === empId)
  //   // );
  //   this.getDepartments().forEach((dep) => {
  //     if (dep.id === depId) {
  //       return dep.employees;
  //     }
  //   });
  //   return null;

  //   // USE BOYAN METHOD
  // }
}

// getEmployeesOfDepName(depName: string): Employee[] {
//   // return Tasks.filter((task) =>
//   //   task.employees.filter((employee) => employee.id === empId)
//   // );
//   this.getDepartments().forEach((dep) => {
//     if (dep.name === depName) {
//       return dep.employees;
//     }
//   });
//   return null;
// }
