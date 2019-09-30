import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Role} from '../role';
import {RolesService} from '../roles.service';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['../roles.component.css', './role-details.component.css'],
})
export class RoleDetailsComponent implements OnInit {
  @Output() closeComp = new EventEmitter();
  @Input() role: Role;

  constructor(private rolesService: RolesService) {}

  ngOnInit() {}

  close() {
    this.closeComp.emit();
  }

  seeEmpRoles(empId) {
    console.log(this.rolesService.getRolesOfEmployee(empId));
  }
}
