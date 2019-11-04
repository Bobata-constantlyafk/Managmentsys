import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Task} from '../tasks.model';
import {TasksService} from '../tasks.service';
import {Department} from 'src/app/department';
import {EmployeeService} from 'src/app/employee.service';
import {Employee} from 'src/app/employees/employee';
import {DepartmentService} from 'src/app/departments/department.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['../tasks.component.css', './task-add.component.css'],
})
export class TaskAddComponent implements OnInit {
  @Output() closeComp = new EventEmitter<boolean>();
  task: Task;
  departments: Department[];
  employees: Employee[];

  constructor(
    private tasksService: TasksService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    // Populate the departments
    this.departmentService
      .getDepartments()
      .subscribe((departments) => (this.departments = departments));
  }

  addTask(
    dep: HTMLInputElement,
    title: HTMLInputElement,
    desc: HTMLInputElement,
    deadline: HTMLInputElement
  ) {
    // Get the values form the inputs
    const taskTitle = title.value;
    const taskDeadline = deadline.value;
    const taskDescription = desc.value;
    const taskDepartment = dep.value;

    // Check if inputs are filled
    if (taskTitle === '' || taskDeadline === '' || taskDescription === '') {
      alert('Fill all');
      return;
    }

    // Get the department ID. Add tasks to databse. Close the form.
    this.departmentService
      .getDepartmentIdByName(taskDepartment)
      .subscribe((depId) => {
        const a = this.tasksService.addTask(
          depId,
          taskTitle,
          taskDescription,
          taskDeadline
        );
        a.subscribe((x) => this.close(true));
      });
  }

  close(taskAdded: boolean) {
    this.closeComp.emit(taskAdded);
  }
}
