import {Employee} from './employees/employee';

export class Department {
  id: number;
  name: string;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Boba
  building: string;
  employees: number[];
  isEditing: boolean;

  constructor(id: number, name: string, building: string) {
    this.id = id;
    this.name = name;
    this.building = building;
    this.employees = [];
    this.isEditing = false;
<<<<<<< HEAD
=======
  isEditing: boolean;
  employees: Employee[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.isEditing = false;
    this.employees = new Array();
>>>>>>> 0832170847b4c04729a9bbb35828a234445765d4
=======
>>>>>>> Boba
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  }

  assignEmployee(employee: Employee): void {
    this.employees.push(employee);
>>>>>>> 0832170847b4c04729a9bbb35828a234445765d4
=======
>>>>>>> Boba
  }
}
