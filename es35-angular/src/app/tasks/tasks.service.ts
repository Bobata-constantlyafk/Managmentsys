import {Injectable} from '@angular/core';
import {Task} from './tasks.model';
import {Tasks} from './mock-tasks';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  path = 'http://i875395.hera.fhict.nl/api/3497186/task';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.path);
  }

  getTaskById(id: number): Observable<Task> {
    const subject = new Subject<Task>();
    this.http
      .get<Task>(this.path, {params: {id: String(id)}})
      .subscribe((task) => {
        subject.next(task);
      });
    return subject.asObservable();
  }

  getLastTask(): Observable<Task> {
    const subject = new Subject<Task>();
    this.getTasks().subscribe((tasks) => {
      subject.next(tasks[tasks.length - 1]);
    });
    return subject.asObservable();
  }

  // getTasksOfDepartment(depId: number): Task[] {
  //   return Tasks.filter((task) => task.department.id === depId);
  // }

  // getTasksOfEmployee(empId: number): Task[] {
  //   const tasks: Task[] = new Array();
  //   Tasks.forEach((task) => {
  //     task.employees.forEach((emp) => {
  //       if (emp.id === empId) {
  //         tasks.push(task);
  //       }
  //     });
  //   });
  //   return tasks;
  // }

  removeTask(id: number): void {
    this.http.delete(this.path, {params: {id: String(id)}});
  }

  // tslint:disable-next-line:variable-name
  addTask(name: string, due_date: string, department_id: number): void {
    this.http.post(this.path, {
      department_id,
      name,
      due_date,
    });
  }

  editTaskTitle(index: number, title: string): void {
    const task = Tasks[index];
    task.name = title;
  }

  // editTaskDescription(index: number, description: string): void {
  //   const task = Tasks[index];
  //   task.description = description;
  // }
}
