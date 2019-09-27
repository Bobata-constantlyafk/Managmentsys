import {Department} from '../department';

export class Role {
  id: number;
  name: string;
  isEditing: boolean;
  department: Department;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.isEditing = false;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
