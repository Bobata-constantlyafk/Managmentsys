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

  show = false;

  currentRole: Role = new Role(0, '');

  constructor() {}

  ngOnInit() {}

  removeRole(event, id) {
    this.roles.splice(id, 1);
  }

  addRole(input) {
    const name: string = input.value;
    const id = Math.max.apply(Math, this.roles.map((role) => role.id));
    this.roles.push(new Role(id, name));
    input.value = '';
  }

  viewDetails(event, i) {
    this.show = true;
    this.currentRole = this.roles[i];
  }

  off() {
    this.show = false;
  }

}
