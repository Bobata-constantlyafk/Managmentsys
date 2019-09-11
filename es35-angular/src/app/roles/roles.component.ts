import { Component, OnInit } from '@angular/core';
import { Role } from '../roles/role';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles = [
    new Role(1,'Marketing manager'),
    new Role(2,'Office manager'),
    new Role(3,'Receptionist'),
    new Role(4,'Accountant')
  ];

  constructor() { }

  ngOnInit() {
  }

}
