import {Employee} from './employees/employee';

export class Department {
  id: number;
  name: string;
<<<<<<< HEAD
  isEditing: boolean;
  building: string;
  employees: Employee[];
=======
  building: string;
  employees: number[];
  isEditing: boolean;
>>>>>>> dimitar

  constructor(id: number, name: string, building: string) {
    this.id = id;
    this.name = name;
<<<<<<< HEAD
    this.isEditing = false;
    this.building = building;
    this.employees = new Array();
=======
    this.building = building;
    this.employees = [];
    this.isEditing = false;
>>>>>>> dimitar
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
<<<<<<< HEAD
  }

  assignEmployee(employee: Employee): void {
    this.employees.push(employee);
=======
>>>>>>> dimitar
  }
}
