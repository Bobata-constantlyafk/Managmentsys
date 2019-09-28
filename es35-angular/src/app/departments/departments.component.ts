import {Component, OnInit} from '@angular/core';
import {Department} from '../department';
import {DepartmentService} from './department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  departments: Department[];

  isEditing = false;

  show = false;

  currentElement;

  currentDep: Department = new Department(0, '');
  constructor(private departmentService: DepartmentService) {}

  getDepartments(): void {
    this.departments = this.departmentService.getDepartments();
  }

  showDep(i) {
    this.show = true;
    this.currentDep = this.departments[i];
  }

  addDep(input) {
    this.departmentService.addDep(input);
  }

  ngOnInit() {
    this.departments = this.departmentService.getDepartments();
    const addInput = document.getElementById('addInput') as HTMLInputElement;
    addInput.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        this.addDep(addInput);
      }
    });
  }

  removeDep(id) {
    this.departmentService.removeDep(id);
  }

  editDep(id) {
    this.currentDep = this.departments[id];
    this.currentDep.toggleEdit();
    setTimeout(() => {
      const el = document.getElementById(
        'departmentEditInput'
      ) as HTMLInputElement;
      el.focus();
      el.select();
      el.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
          this.currentDep.toggleEdit();
          el.removeEventListener('focusout', handler);
        }
      });
      const handler = (event) => {
        this.currentDep.toggleEdit();
        el.removeEventListener('focusout', handler);
      };
      el.addEventListener('focusout', handler);
    }, 1);
  }

  off() {
    this.show = false;
  }
}
