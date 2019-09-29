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
    this.employees = new Array();
  }

  assignEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  assignDepartment(department: Department): void {
    this.department = department;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
