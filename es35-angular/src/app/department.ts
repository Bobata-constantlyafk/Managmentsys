import {Employee} from './employees/employee';

export class Department {
  id: number;
  name: string;
  building: string;
  employees: number[];
  isEditing: boolean;

  constructor(id: number, name: string, building: string) {
    this.id = id;
    this.name = name;
    this.building = building;
    this.employees = [];
    this.isEditing = false;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
