import {Component, OnInit} from '@angular/core';
import {Department} from '../department';
import {DepartmentService} from './department.service';
import {TouchSequence} from 'selenium-webdriver';
import {Task} from '../tasks/tasks.model';

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

<<<<<<< HEAD
  currentDep: Department = new Department(0, '', '');
  constructor(private departmentService: DepartmentService) {}

  // getDepartments(): void {
  //   this.departments = this.departmentService.getDepartments();
  // }
=======
  currentElement;

  currentDep: Department = new Department(0, '', '');
  constructor(private departmentService: DepartmentService) {}

  getDepartments(): void {
    this.departmentService
      .getDepartments()
      .subscribe((departments) => (this.departments = departments));
  }
>>>>>>> dimitar

  viewDetails(i) {
    this.showDetails = true;
    this.showOverlay = true;
    this.currentDep = this.departments[i];
  }

<<<<<<< HEAD
  closeAddDialog() {
    this.showAddForm = false;
    this.departmentService.getDepartments().subscribe();
  }

  addDep(input, inp) {
    this.departmentService.addDep(input, inp);
  }

  ngOnInit() {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departments = departments;
=======
  addDep(input) {
    const split = input.value().split(',');
    const name = split[0];
    const builing = split[1];
    this.departmentService.addDepartment(name, builing);
  }

  ngOnInit() {
    this.departmentService
      .getDepartments()
      .subscribe((department) => (this.departments = department));
    const addInput = document.getElementById('addInput') as HTMLInputElement;
    addInput.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        this.addDep(addInput);
      }
>>>>>>> dimitar
    });

    this.showDetails = false;
    this.showOverlay = false;
    this.showAddForm = false;
  }

  removeDep(i: number) {
    const departmentId = this.departments[i].id;
    this.departmentService.removeDepartment(departmentId);
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
    let departments = [];
    this.departmentService.getDepartments().subscribe((data) => {
      departments = data;
      const filter = s.toUpperCase();
      this.departments = departments.filter(
        (task) => task.name.toUpperCase().indexOf(filter) > -1
      );
    });
  }
}
