import {Department} from '../department';
export class Employee {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  lastname: string;
  isEditing: boolean;
  department: Department;

  constructor(id: number, name: string, lastname: string) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.isEditing = false;
    this.department = new Department(1, '');
  }

  assignDepartment(department: Department): void {
    this.department = department;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
