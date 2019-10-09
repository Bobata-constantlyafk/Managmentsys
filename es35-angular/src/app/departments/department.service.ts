import {Injectable} from '@angular/core';
import {Department} from '../department';
import {DEPARTMENTS} from '../mock-departments';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  path = 'http://i875395.hera.fhict.nl/api/3497186/department';

  constructor(private http: HttpClient) {}

  getDepartments(): Department[] {
    return DEPARTMENTS;
  }
  removeDep(id) {
    this.getDepartments().splice(id, 1);
  }
  addDep(input) {
    const name: string = input.value;
    const id = Math.max.apply(
      Math,
      this.getDepartments().map((task) => task.id)
    );
    this.getDepartments().push(new Department(id, name));
    input.value = '';
  }

  getDepartmentIdByName(name: string): number {
    return this.getDepartments().filter(
      (department) => department.name === name
    )[0].id;
  }
  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(this.path + '?id=' + id);
  }
}
