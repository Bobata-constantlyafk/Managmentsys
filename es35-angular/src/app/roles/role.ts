import {Department} from '../department';
import {Employee} from '../employees/employee';

export class Role {
  id: number;
  title: string;
  description: string;
  isEditing: boolean;
  department: Department;
  employees: Employee[];

  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isEditing = false;
    this.employees = new Array();
    this.department = new Department(1, '', '');
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
