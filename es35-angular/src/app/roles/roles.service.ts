import {Injectable} from '@angular/core';
import {Role} from '../roles/role';
import {Roles} from './mock-roles';
import {Department} from '../department';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor() {}

  getRoles(): Role[] {
    return Roles;
  }

  getRoleByIndex(index: number): Role {
    return Roles[index];
  }

  getLastRole(): Role {
    return Roles[Roles.length - 1];
  }

  getRolesOfDepartment(depId: number): Role[] {
    return Roles.filter((role) => role.department.id === depId);
  }

  getRolesOfEmployee(empId: number): Role[] {
    const roles: Role[] = new Array();
    Roles.forEach((role) => {
      role.employees.forEach((emp) => {
        if (emp.id === empId) {
          roles.push(role);
        }
      });
    });
    return roles;
  }

  removeRole(index: number): void {
    Roles.splice(index, 1);
  }

  addRole(roleTitle: string, roleDesc: string): Role {
    const id: number = Roles[Roles.length - 1].id + 1;
    Roles.push(new Role(id, roleTitle, roleDesc));
    return Roles[id - 1];
  }

  editRoleTitle(index: number, title: string): void {
    const role = Roles[index];
    role.title = title;
  }

  editRoleDescription(index: number, description: string): void {
    const role = Roles[index];
    role.description = description;
  }
}
