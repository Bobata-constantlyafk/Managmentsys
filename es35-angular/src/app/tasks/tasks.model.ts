import {Department} from '../department';
import {Employee} from '../employees/employee';

export class Task {
  id: number;
  name: string;
  isEditing: boolean;
  deadline: string;
  departmentId: number;
  employees: Employee[];

  constructor(id: number, name: string, deadline: string) {
    this.id = id;
    this.name = name;
    this.isEditing = false;
    this.employees = new Array();
    this.departmentId = 0;
    this.deadline = deadline;
  }

  assignEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  assignDepartment(id: number): void {
    this.departmentId = id;
  }

  assignDeadline(deadline: string) {
    this.deadline = deadline;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
