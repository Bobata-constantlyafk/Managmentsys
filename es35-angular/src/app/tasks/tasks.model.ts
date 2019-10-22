import {Department} from '../department';
import {Employee} from '../employees/employee';

export class Task {
  id: number;
  title: string;
  description: string;
  isEditing: boolean;
  deadline: string;
  department: Department;
  employees: Employee[];

  constructor(
    id: number,
    title: string,
    description: string,
    deadline: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isEditing = false;
    this.employees = new Array();
    this.department = new Department(1, '', '');
    this.deadline = deadline;
  }

  assignEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  assignDepartment(department: Department): void {
    this.department = department;
  }

  assignDeadline(deadline: string) {
    this.deadline = deadline;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
