export class Employee {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  lastname: string;
  isEditing: boolean;

  constructor(id: number, name: string, lastname: string) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.isEditing = false;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
