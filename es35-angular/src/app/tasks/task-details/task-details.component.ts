import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Task} from '../tasks.model';
import {TasksService} from '../tasks.service';
import {Employee} from 'src/app/employees/employee';
import {EmployeeService} from 'src/app/employee.service';
import {Department} from 'src/app/department';
import {DepartmentService} from 'src/app/departments/department.service';

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
  department: Department;

  edit: boolean;

  constructor(
    private tasksService: TasksService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.employeeService
      .getEmployeesOfDepartment(this.task.department_id)
      .subscribe((employees) => (this.employees = employees));
    this.departmentService
      .getDepartmentById(this.task.department_id)
      .subscribe((department) => {
        this.department = department;
        // this.department.employees.forEach((employeeId) => {
        //   console.log(employeeId);
        //   this.employeeService
        //     .getEmployeeById(employeeId)
        //     .subscribe((employee) => {
        //       this.employees.push(employee);
        //       console.log(employee);
        //     });
        // });
      });
  }

  viewEdit() {
    this.edit = true;
  }

  close() {
    this.closeComp.emit();
  }

  // seeEmpTasks(empId) {
  //   console.log(this.tasksService.getTasksOfEmployee(empId));
  // }

  // addEmp(empName: string) {
  //   if (empName === '') {
  //     return;
  //   }
  //   const selectedEmp = this.employeeService
  //     .getEmployees()
  //     .filter((employee) => employee.name === empName)[0];
  //   this.task.assignEmployee(selectedEmp);
  //   this.employees.splice(this.employees.indexOf(selectedEmp), 1);
  // }

  // removeEmp(empIndex) {
  //   this.tasksService.removeTask();
  //   this.employees.push(this.task.employees[empIndex]);
  //   this.task.employees.splice(empIndex, 1);
  // }
}
