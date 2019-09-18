import { Component, OnInit } from '@angular/core'; 
import { Department } from '../department';
import { DEPARTMENTS } from '../mock-departments';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departments = DEPARTMENTS;
  constructor() { }

  ngOnInit() {
  }

  showDep(input) {
    const name: string = input.value;
    const id = Math.max.apply(Math, this.departments.map((task) => task.id));
    this.departments.push(new Department(id, name));
    input.value = '';
  }

  removeDep(event, id) {
    const el = event.target;
    const parent = el.parentNode;
    // parent.classList.remove('animated');
    // parent.classList.add('animated');
    this.departments.splice(id, 1);
  }

  addDep(input) {
    const name: string = input.value;
    const id = Math.max.apply(Math, this.departments.map((task) => task.id));
    this.departments.push(new Department(id, name));
    input.value = '';
  }

}