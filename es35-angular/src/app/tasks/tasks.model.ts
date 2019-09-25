import {Department} from '../department';
import {Employee} from '../employees/employee';

export class Task {
  id: number;
  title: string;
  description: string;
  isEditing: boolean;
  deadline: Date;
  department: Department;
  employees: Employee[];

  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isEditing = false;
  }

  assignEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
