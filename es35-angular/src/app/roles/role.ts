export class Role {
  id: number;
  name: string;
  isEditing: boolean;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.isEditing = false;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  }
