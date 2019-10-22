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

  showDetails: boolean;
  showOverlay: boolean;
  showAddForm: boolean;

  currentDep: Department = new Department(0, '', '');
  constructor(private departmentService: DepartmentService) {}

  getDepartments(): void {
    this.departments = this.departmentService.getDepartments();
  }

  viewDetails(i) {
    this.showDetails = true;
    this.showOverlay = true;
    this.currentDep = this.departments[i];
  }

  addDep(input, inp) {
    this.departmentService.addDep(input, inp);
  }

  ngOnInit() {
    this.departments = this.departmentService.getDepartments();
    this.showDetails = false;
    this.showOverlay = false;
    this.showAddForm = false;
  }

  removeDep(id) {
    this.departmentService.removeDep(id);
  }

  closeDetails() {
    this.showDetails = false;
    this.showOverlay = false;
  }

  viewAddForm(): void {
    this.showOverlay = true;
    this.showAddForm = true;
  }

  closeAddForm(): void {
    this.showOverlay = false;
    this.showAddForm = false;
  }

  closeEverything(): void {
    this.showOverlay = false;
    this.showAddForm = false;
    this.showDetails = false;
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
  search(s: string) {
    const departments = this.departmentService.getDepartments();
    const filter = s.toUpperCase();
    this.departments = departments.filter(
      (department) => department.name.toUpperCase().indexOf(filter) > -1
    );
  }
}
