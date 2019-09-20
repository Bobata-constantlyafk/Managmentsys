import { Component, OnInit } from '@angular/core';
import { Role } from '../roles/role';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles = [
    new Role(1,'Role 1'),
    new Role(2,'Role 2'),
    new Role(3,'Role 3'),
    new Role(4,'Role 4')
  ];

  isEditing = false;
  show = false;
  currentElement;

  currentRole: Role = new Role(0, '');

  constructor() {}

  ngOnInit() {
    const addInput = document.getElementById('addInput') as HTMLInputElement;
    addInput.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        this.addRole(addInput);
      }
    });
  }

  removeRole(event, id) {
    this.roles.splice(id, 1);
  }

  addRole(input) {
    const name: string = input.value;
    const id = Math.max.apply(Math, this.roles.map((role) => role.id));
    this.roles.push(new Role(id, name));
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
        }
      });
      el.addEventListener('focusout', (event) => {
        this.currentRole.toggleEdit();
      });
    }, 1);
  }

  off() {
    this.show = false;
  }

}
