import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [
    new Employee(1, "Bobert","Williamson"),
    new Employee(68, "Sven","Bjergsen"),
    new Employee(421, "Strahomir","Bozhikravov"),
    new Employee(4, "Monica","Bellucci"),
    new Employee(10, "Himari","Nakamoto"),
    new Employee(7, "Jordan","Jordanoff"),
    new Employee(8,"Roza","Yordanova")
  ];
  // employees: number[] = [1, 2, 3, 4]

  constructor() { }

  ngOnInit() {
    console.log(this.employees)
  }

}
