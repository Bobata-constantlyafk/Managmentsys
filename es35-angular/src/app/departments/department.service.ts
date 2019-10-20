import {Injectable} from '@angular/core';
import {Department} from '../department';
import {DEPARTMENTS} from '../mock-departments';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  path = 'http://i875395.hera.fhict.nl/api/3497186/department';
  constructor(private http: HttpClient) {}

  // getDepartments(): Department[] {
  //   return DEPARTMENTS;
  // }
  // removeDep(id) {
  //   this.getDepartments().splice(id, 1);
  // }
  // addDep(input) {
  //   const name: string = input.value;
  //   // const building: string = building.value;
  //   const id = Math.max.apply(
  //     Math,
  //     this.getDepartments().map((task) => task.id)
  //   );
  // this.http.post(this.path, {
  //   name,
  //   building: ,
  // });
  // this.getDepartments().push(new Department(id, name));
  //   input.value = '';
  // }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.path);
  }

  getDepartmentIdByName(name: string): Observable<number> {
    const subject = new Subject<number>();
    this.getDepartments().subscribe((departments) => {
      subject.next(
        departments.filter((department) => department.name === name)[0].id
      );
    });
    return subject.asObservable();
  }
  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(this.path + '?id=' + id);
  }

  addDepartment(name: string, building: string) {
    this.http.post(this.path, {name, building});
  }

  removeDepartment(id: number) {
    this.http.delete(this.path + '?id=' + id);
  }
}
