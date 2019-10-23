import {Component, OnInit, ɵɵcontainerRefreshEnd} from '@angular/core';
import {TasksService} from '../tasks/tasks.service';
import {DepartmentService} from '../departments/department.service';
import {EmployeeService} from '../employee.service';
import {RolesService} from '../roles/roles.service';
import {Task} from '../tasks/tasks.model';
import {Department} from '../department';
import {Employee} from '../employees/employee';
import {Role} from '../roles/role';
import {Observable} from 'rxjs';
import {callbackify} from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../tasks/tasks.component.css', './dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Chart Configuration
  // chart-options <START>
  title = 'Angular Charts';
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Number of Tasks';
  showYAxisLabel = true;
  yAxisLabel = 'Department';
  timeline = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };
  // chart-options <END>
  data = [];
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
    // this.departmentService
    //   .getDepartments()
    //   .subscribe((data) => (this.departments = data));
    // this.employees = this.employeeService.getEmployees();
    // this.roles = this.roleService.getRoles();
    // this.updateChart();
  }

  // Updates the chart data
  updateChart() {
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
            // assign the data variable to the temporary
            if (tmp.length === Object.keys(x).length) {
              this.data = tmp;
            }
          });
        }
      }
    });
  }

  updateView(option) {
    switch (option) {
      case 'tasks':
        this.selectedOption = this.tasks;
        break;
      case 'departments':
        this.selectedOption = this.departments;
        break;
      case 'employees':
        this.selectedOption = this.employees;
        break;
      case 'roles':
        this.selectedOption = this.roles;
        break;
    }
  }

  isTask(candidate) {
    return candidate instanceof Task;
  }

  isDepartment(candidate) {
    return candidate instanceof Department;
  }

  isEmployee(candidate) {
    return candidate instanceof Employee;
  }

  isRole(candidate) {
    return candidate instanceof Role;
  }
}
