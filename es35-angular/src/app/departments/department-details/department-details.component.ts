import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Department} from 'src/app/department';
import {DepartmentService} from 'src/app/departments/department.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: [
    '../departments.component.css',
    './department-details.component.css',
  ],
})
export class DepartmentDetailsComponent implements OnInit {
  @Output() closeComp = new EventEmitter();
  @Input() department: Department;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {}

  close() {
    this.closeComp.emit();
  }

  // seeDepEmps(depId) {
  //   console.log(this.departmentService.getEmployeesOfDepId(depId));
  //   // bobkata chakam
  // }
}
