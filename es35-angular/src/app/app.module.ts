import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {TasksComponent} from './tasks/tasks.component';
import {DepartmentsComponent} from './departments/departments.component';
import {RolesComponent} from './roles/roles.component';
import {EmployeesComponent} from './employees/employees.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TaskDetailsComponent} from './tasks/task-details/task-details.component';
import {TaskAddComponent} from './tasks/task-add/task-add.component';
import {DepartmentAddComponent} from './departments/department-add/department-add.component';
import {DepartmentDetailsComponent} from './departments/department-details/department-details.component';
import {RoleDetailsComponent} from './roles/role-details/role-details.component';
import {RoleAddComponent} from './roles/role-add/role-add.component';
import {EmployeeAddComponent} from './employees/employee-add/employee-add.component';
import {EmployeeDetailsComponent} from './employees/employee-details/employee-details.component';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  // {path: '', redirectTo: 'tasks', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'departments', component: DepartmentsComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'roles', component: RolesComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    DepartmentsComponent,
    EmployeesComponent,
    RolesComponent,
    TasksComponent,
    DashboardComponent,
    TaskDetailsComponent,
    TaskAddComponent,
    DepartmentAddComponent,
    DepartmentDetailsComponent,
    RoleDetailsComponent,
    RoleAddComponent,
    EmployeeAddComponent,
    EmployeeDetailsComponent,
    HttpClientModule,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
      // {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
