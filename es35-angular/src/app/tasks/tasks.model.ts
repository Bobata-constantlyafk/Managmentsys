import {Department} from '../department';
import {Employee} from '../employees/employee';

export class Task {
  id: number;
  name: string;
  isEditing: boolean;
  // tslint:disable-next-line:variable-name
  due_date: string;
  description: string;
  // tslint:disable-next-line:variable-name
  department_id: number;
  employees: number[];

  constructor(id: number, name: string, deadline: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isEditing = false;
    this.employees = [];
    this.department_id = 0;
    this.due_date = deadline;
  }

  assignEmployee(employeeId: number): void {
    this.employees.push(employeeId);
  }

  assignDepartment(id: number): void {
    this.department_id = id;
  }

  assignDeadline(deadline: string) {
    this.due_date = deadline;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
