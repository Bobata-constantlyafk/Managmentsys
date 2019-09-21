export class Employee {

    id: number;
    name: string;
    lastname: string
    isEditing: boolean;

    constructor(id: number, name: string,lastname: string) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
    }
    
    toggleEdit() {
        this.isEditing = !this.isEditing;
      }
}