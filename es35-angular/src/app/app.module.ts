import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {TasksComponent} from './tasks/tasks.component';
import {DepartmentsComponent} from './departments/departments.component';
import {RolesComponent} from './roles/roles.component';
import {EmployeesComponent} from './employees/employees.component';
import { MessageComponent } from './message/message.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'tasks', pathMatch: 'full'},
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
    MessageComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
