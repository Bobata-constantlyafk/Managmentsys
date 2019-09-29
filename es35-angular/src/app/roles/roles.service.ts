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

  removeRole(index): void {
    Roles.splice(index, 1);
  }

  addRole(roleName) {
    const id: number = Roles[Roles.length - 1].id + 1;
    const name: string = roleName;
    Roles.push(new Role(id, name));
  }
}
