import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Task} from '../tasks.model';
import {TasksService} from '../tasks.service';
import {Employee} from 'src/app/employees/employee';
import {EmployeeService} from 'src/app/employee.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['../tasks.component.css', './task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  @Output() closeComp = new EventEmitter();
  @Input() task: Task;

  employees: Employee[];
  selectedEmp: Employee;
  allEmployees: Employee[];

  constructor(
    private tasksService: TasksService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.allEmployees = this.employeeService.getEmployees();
    this.employees = [];
    for (const employee of this.allEmployees) {
      if (this.task.employees.indexOf(employee) < 0) {
        this.employees.push(employee);
      }
    }
  }

  close() {
    this.closeComp.emit();
  }

  seeEmpTasks(empId) {
    console.log(this.tasksService.getTasksOfEmployee(empId));
  }

  addEmp(empName: string) {
    if (empName === '') {
      return;
    }
    const selectedEmp = this.employeeService
      .getEmployees()
      .filter((employee) => employee.name === empName)[0];
    this.task.assignEmployee(selectedEmp);
    this.employees.splice(this.employees.indexOf(selectedEmp), 1);
  }

  removeEmp(empIndex) {
    this.employees.push(this.task.employees[empIndex]);
    this.task.employees.splice(empIndex, 1);
  }
}
