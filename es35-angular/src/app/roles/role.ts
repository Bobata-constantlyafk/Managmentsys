import {Department} from '../department';
import {Employee} from '../employees/employee';

export class Role {
  id: number;
  name: string;
  isEditing: boolean;
  department: Department;
  employees: Employee[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.isEditing = false;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
