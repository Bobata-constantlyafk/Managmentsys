import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Department} from 'src/app/department';
import {DepartmentService} from 'src/app/departments/department.service';
import {EmployeeService} from 'src/app/employee.service';
import {Employee} from 'src/app/employees/employee';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['../departments.component.css', './department-add.component.css'],
})
export class DepartmentAddComponent implements OnInit {
  @Output() closeComp = new EventEmitter();
  department: Department;
  employees: Employee[];

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
    // this.employeeService.getEmployees().subscribe((employees) => (this.employees = employees));
    //  Eventualno shti se naloji da polzvash tva Ivka - Bobka
  }

  addDep(name: HTMLInputElement, build: HTMLInputElement) {
    console.log(name);
    const depName = name.value;
    console.log(build);
    const buildName = build.value;
    if (depName === '') {
      alert('Fill all');
      return;
    }
    if (buildName === '') {
      alert('Fill all');
      return;
    }

    this.departmentService
      .addDep(name.value, build.value)
      .subscribe((x) => this.close());
  }

  // addTask(
  //   title: HTMLInputElement,
  //   dep: HTMLInputElement,
  //   emp: HTMLInputElement,
  //   desc: HTMLInputElement,
  //   deadline: HTMLInputElement
  // ) {
  //   const taskTitle = title.value;
  //   const taskDeadline = deadline.value;
  //   const taskDescription = desc.value;
  //   if (taskTitle === '' || taskDeadline === '' || taskDescription === '') {
  //     alert('Fill all');
  //     return;
  //   }

  //   // Assign Department
  //   const taskDepartment = dep.value;
  //   this.departmentService
  //     .getDepartmentIdByName(taskDepartment)
  //     .subscribe((depId) => {
  //       this.tasksService.addTask(
  //         depId,
  //         taskTitle,
  //         taskDescription,
  //         taskDeadline
  //       );
  //     });

  //   this.close();
  // }

  close() {
    this.closeComp.emit();
  }
}
