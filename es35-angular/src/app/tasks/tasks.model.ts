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

  constructor(
    departmentId: number,
    name: string,
    description: string,
    // tslint:disable-next-line:variable-name
    due_date: string
  ) {
    this.name = name;
    this.description = description;
    this.isEditing = false;
<<<<<<< HEAD
    this.employees = new Array();
    this.department = new Department(1, '', '');
    this.deadline = deadline;
=======
    this.employees = [];
    this.department_id = departmentId;
    this.due_date = due_date;
>>>>>>> dimitar
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
