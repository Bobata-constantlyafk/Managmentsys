import {Component, OnInit} from '@angular/core';
import {Department} from '../department';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [
    new Department(1, 'Task1'),
    new Department(2, 'Task2'),
    new Department(3, 'Task3'),
    new Department(4, 'Task4'),
  ];
  
  
  isEditing = false;
  
  show = false;
  
  currentElement;
  
  currentDep: Department = new Department(0, '');
  constructor() {}
  
  showDep(i) {
    this.show = true;
    this.currentDep = this.departments[i];
  }


  addDep(input) {
    const name: string = input.value;
    const id = Math.max.apply(Math, this.departments.map((task) => task.id));
    this.departments.push(new Department(id, name));
    input.value = '';
  }


    ngOnInit() {
      const addInput = document.getElementById('addInput') as HTMLInputElement;
    addInput.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        this.addDep(addInput);
      }
    });
    }

    removeDep(event, id) {
      this.departments.splice(id, 1);
    }

    editDep(id) {
      this.currentDep = this.departments[id];
      this.currentDep.toggleEdit();
      setTimeout(() => {
        const el = document.getElementById('departmentEditInput') as HTMLInputElement;
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
