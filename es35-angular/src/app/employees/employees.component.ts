import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [
    new Employee(1, "Bob"),
    new Employee(2, "Sven"),
    new Employee(3, "Robert"),
    new Employee(4, "Patric"),
  ];

  constructor() { }

  ngOnInit() {
    console.log(this.employees)
  }

}
