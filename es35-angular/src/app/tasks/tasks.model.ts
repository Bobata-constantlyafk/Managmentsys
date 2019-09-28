import {Department} from '../department';
import {Employee} from '../employees/employee';

export class Task {
  id: number;
  name: string;
  deadline: Date;
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
