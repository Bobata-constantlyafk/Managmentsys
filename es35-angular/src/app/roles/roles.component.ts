import {Component, OnInit} from '@angular/core';
import {Role} from '../roles/role';
import {RolesService} from './roles.service';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  roles: Role[];
  isEditing = false;
  show = false;

  currentRole: Role = new Role(0, '');

  constructor(private rolesService: RolesService) {}

  ngOnInit() {
    const addInput = document.getElementById('addInput') as HTMLInputElement;
    addInput.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        this.addRole(addInput);
      }
    });
  }

  removeRole(id) {
    this.rolesService.removeRole(id);
  }

  addRole(input) {
    const roleName = input.value;
    this.rolesService.addRole(roleName);
    input.value = '';
  }

  viewDetails(i) {
    this.show = true;
    this.currentRole = this.roles[i];
  }
  editRole(id) {
    this.currentRole = this.roles[id];
    this.currentRole.toggleEdit();
    setTimeout(() => {
      const el = document.getElementById('roleEditInput') as HTMLInputElement;
      el.focus();
      el.select();
      el.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
          this.currentRole.toggleEdit();
          el.removeEventListener('focusout', handler);
        }
      });
      const handler = (event) => {
        this.currentRole.toggleEdit();
        el.removeEventListener('focusout', handler);
      };
      el.addEventListener('focusout', handler);
    }, 1);
  }

  off() {
    this.show = false;
  }
}
