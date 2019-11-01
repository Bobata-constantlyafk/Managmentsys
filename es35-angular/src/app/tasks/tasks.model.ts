export class Task {
  id: number;
  name: string;
  isEditing: boolean;
  due_date: string;
  description: string;
  department_id: number;
  employees: number[];

  constructor(
    departmentId: number,
    name: string,
    description: string,
    due_date: string
  ) {
    this.name = name;
    this.description = description;
    this.isEditing = false;
    this.employees = [];
    this.department_id = departmentId;
    this.due_date = due_date;
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
