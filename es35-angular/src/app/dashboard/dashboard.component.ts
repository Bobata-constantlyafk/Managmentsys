import {Component, OnInit, ɵɵcontainerRefreshEnd} from '@angular/core';
import {TasksService} from '../tasks/tasks.service';
import {DepartmentService} from '../departments/department.service';
import {EmployeeService} from '../employee.service';
import {RolesService} from '../roles/roles.service';
import {Task} from '../tasks/tasks.model';
import {Department} from '../department';
import {Employee} from '../employees/employee';
import {Role} from '../roles/role';
import {Subject, Observable, ObservedValueOf} from 'rxjs';
import {ColorSets} from './chart-color-sets';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../tasks/tasks.component.css', './dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  charts = {
    tasksPerDepartment: {
      title: 'Tasks Per Department',
      xAxisLabel: 'Department',
      yAxisLabel: 'Number of Tasks',
      timeline: true,
      colorScheme: ColorSets[5],
      // chart-options <END>
      data: [],
    },
    employeesPerDepartment: {
      title: 'Employees Per Department',
      xAxisLabel: 'Department',
      yAxisLabel: 'Number of Employees',
      timeline: true,
      colorScheme: ColorSets[4],
      // chart-options <END>
      data: [],
    },
  };
  // Chart Configuration
  // chart-options <START>
  // ------------------------

  all;
  tasks: Task[];
  departments: Department[];
  employees: Employee[];
  roles: Role[];
  searchTerm: string;

  selectedOption;

  option;

  constructor(
    private tasksService: TasksService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private roleService: RolesService
  ) {}

  ngOnInit() {
    this.tasksService
      .getTasks()
      .subscribe((data) => (this.tasks = Object.values(data)));
    this.departmentService
      .getDepartments()
      .subscribe((data) => (this.departments = data));
    this.roles = this.roleService.getRoles();
    this.updateCharts();
  }

  // Updates the chart data
  updateCharts() {
    this.getNumberOfTasksPerDepartment().subscribe(
      (data) => (this.charts.tasksPerDepartment.data = data)
    );
    this.getNumberOfEmployeesPerDepartment().subscribe(
      (data) => (this.charts.employeesPerDepartment.data = data)
    );
  }

  getNumberOfEmployeesPerDepartment(): Observable<any> {
    const subject = new Subject<object>();
    const tmp = [];
    this.employeeService.getEmployeesByDep().subscribe((data) => {
      const data_keys = Object.keys(data);
      data_keys.forEach((department_id) => {
        this.departmentService.getDepartments().subscribe((departments) => {
          const departmentName = departments.find(
            (department) => department_id === String(department.id)
          ).name;
          tmp.push({name: departmentName, value: data[department_id]});
          if (tmp.length === Object.keys(data).length) {
            subject.next(tmp);
          }
        });
      });
    });
    return subject.asObservable();
  }

  getNumberOfTasksPerDepartment(): Observable<any> {
    const subject = new Subject<any[]>();
    this.tasksService.getNumberOfTasksPerDepartment().subscribe((x) => {
      const tmp = [];
      // Go through the dictionary
      for (const key in x) {
        // This is if is necesary
        if (x.hasOwnProperty(key)) {
          let departmentName: string;
          this.departmentService.getDepartments().subscribe((departments) => {
            // Get department name by ID
            departmentName = departments.filter(
              (department) => String(department.id) === key
            )[0].name;

            // Push the results to a temporary array
            tmp.push({name: departmentName, value: x[key]});

            // If it went through all keys in the dictionary
            // assign the subject to the temporary so it could be returned
            if (tmp.length === Object.keys(x).length) {
              subject.next(tmp);
            }
          });
        }
      }
    });
    return subject.asObservable();
  }
}
