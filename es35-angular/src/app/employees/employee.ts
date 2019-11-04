import {Department} from '../department';
export class Employee {
  id: number;
  // tslint:disable-next-line:variable-name
  first_name: string;
  // tslint:disable-next-line:variable-name
  last_name: string;
  // tslint:disable-next-line:variable-name
  birth_date: string;
  lastname: string;
  isEditing: boolean;
  // tslint:disable-next-line:variable-name
  department_id: number;

  constructor(
    // tslint:disable-next-line:variable-name
    first_name: string,
    // tslint:disable-next-line:variable-name
    last_name: string,
    // tslint:disable-next-line:variable-name
    birth_date: string,
    // tslint:disable-next-line:variable-name
    department_id: number
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.isEditing = false;
    this.department_id = department_id;
    this.birth_date = birth_date;
  }

  assignDepartment(id: number): void {
    this.department_id = id;
  }

  assignBirthDay(birthday: string) {
    this.birth_date = birthday;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
