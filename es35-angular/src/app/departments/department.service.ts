import {Injectable} from '@angular/core';
import {Department} from '../department';
import {DEPARTMENTS} from '../mock-departments';
import {Employee} from 'D:/WEB2GIT/es35-2/es35-angular/src/app/employees/employee';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  getDepartments(): Department[] {
    return DEPARTMENTS;
  }
  getDepByIndex(index: number): Department {
    return this.getDepartments()[index];
  }
  getDepByName(name: string): Department {
    return this.getDepartments().filter(
      (department) => department.name === name
    )[0];
  }
  getLastDep(): Department {
    return this.getDepartments()[this.getDepartments().length - 1];
  }
  removeDep(id) {
    this.getDepartments().splice(id, 1);
  }
  addDep(input) {
    const name: string = input;
    const id = Math.max.apply(
      Math,
      this.getDepartments().map((department) => department.id)
    );
    this.getDepartments().push(new Department(id, name));
  }
  getEmployeesOfDepId(depId: number): Employee[] {
    // return Tasks.filter((task) =>
    //   task.employees.filter((employee) => employee.id === empId)
    // );
    this.getDepartments().forEach((dep) => {
      if (dep.id === depId) {
        return dep.employees;
      }
    });
    return null;
  }
  getEmployeesOfDepName(depName: string): Employee[] {
    // return Tasks.filter((task) =>
    //   task.employees.filter((employee) => employee.id === empId)
    // );
    this.getDepartments().forEach((dep) => {
      if (dep.name === depName) {
        return dep.employees;
      }
    });
    return null;
  }

  editDepName(index: number, name: string): void {
    const department = this.getDepartments()[index];
    department.name = name;
  }

  constructor() {}
}
