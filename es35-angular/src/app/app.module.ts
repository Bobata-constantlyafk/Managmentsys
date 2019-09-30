import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {TasksComponent} from './tasks/tasks.component';
import {DepartmentsComponent} from './departments/departments.component';
import {RolesComponent} from './roles/roles.component';
import {EmployeesComponent} from './employees/employees.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TaskDetailsComponent} from './tasks/task-details/task-details.component';
import {TaskAddComponent} from './tasks/task-add/task-add.component';

const appRoutes: Routes = [
  // {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '', redirectTo: 'tasks', pathMatch: 'full'},
  // {path: 'dashboard', component: DashboardComponent},
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
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
      // {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
