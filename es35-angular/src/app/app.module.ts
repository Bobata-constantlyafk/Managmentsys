import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
<<<<<<< HEAD
import { DepartmentsComponent } from './departments/departments.component';
=======
import { TasksComponent } from './tasks/tasks.component';
>>>>>>> origin/dev

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    DepartmentsComponent
=======
    TasksComponent
>>>>>>> origin/dev
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
