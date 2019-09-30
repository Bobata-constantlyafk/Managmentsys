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

  constructor(
    private tasksService: TasksService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }

  close() {
    this.closeComp.emit();
  }

  seeEmpTasks(empId) {
    console.log(this.tasksService.getTasksOfEmployee(empId));
  }

  addEmp(empName: string) {
    const selectedEmp = this.employeeService
      .getEmployees()
      .filter((employee) => employee.name === empName)[0];
    this.task.assignEmployee(selectedEmp);
  }
}
