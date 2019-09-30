import {Injectable} from '@angular/core';
import {Role} from '../roles/role';
import {Roles} from './mock-roles';

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

  removeRole(index: number): void {
    Roles.splice(index, 1);
  }

  addRole(roleTitle: string, roleDesc: string): void {
    const id: number = Roles[Roles.length - 1].id + 1;
    Roles.push(new Role(id, roleTitle, roleDesc));
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
