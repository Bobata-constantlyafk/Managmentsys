import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {EmployeeService} from 'src/app/employee.service';
import {Employee} from '../employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css', '../employees.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  @Output() closeComp = new EventEmitter();
  @Input() employee: Employee;

  constructor(private employeesService: EmployeeService) {}

  ngOnInit() {}

  close() {
    this.closeComp.emit();
  }
}
