import {Employee} from './employees/employee';

export class Department {
  id: number;
  name: string;
  isEditing: boolean;
  building: string;
  employees: Employee[];

  constructor(id: number, name: string, building: string) {
    this.id = id;
    this.name = name;
    this.isEditing = false;
    this.building = building;
    this.employees = new Array();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  assignEmployee(employee: Employee): void {
    this.employees.push(employee);
  }
}
