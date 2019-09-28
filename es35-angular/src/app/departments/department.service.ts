import {Injectable} from '@angular/core';
import {Department} from '../department';
import {DEPARTMENTS} from '../mock-departments';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
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
  constructor() {}
}
