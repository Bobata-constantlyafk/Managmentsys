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
  showDetails: boolean;
  showOverlay: boolean;
  showAddForm: boolean;

  currentRole: Role = new Role(0, ' ', ' ');

  constructor(private rolesService: RolesService) {}

  ngOnInit() {
    this.roles = this.rolesService.getRoles();
    this.showDetails = false;
    this.showOverlay = false;
    this.showAddForm = false;
  }

  removeRole(id) {
    this.rolesService.removeRole(id);
  }

  viewDetails(i) {
    this.showDetails = true;
    this.showOverlay = true;
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

  closeDetails() {
    this.showDetails = false;
    this.showOverlay = false;
  }

  viewAddForm(): void {
    this.showOverlay = true;
    this.showAddForm = true;
  }

  closeAddForm(): void {
    this.showOverlay = false;
    this.showAddForm = false;
  }

  closeEverything(): void {
    this.showOverlay = false;
    this.showAddForm = false;
    this.showDetails = false;
  }
}
