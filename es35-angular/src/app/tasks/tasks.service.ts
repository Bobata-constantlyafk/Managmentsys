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

  // Get a task by ID
  getTaskById(id: number): Observable<Task> {
    // Make a subject that will later evaluate to the data that has to be returned
    // Subject is used because this is the only way to return from a HTTP request
    // since it is async and a evaluated value has to be returned
    const subject = new Subject<Task>();
    this.http
      .get<Task>(this.path, {params: {id: String(id)}})
      .subscribe((task) => {
        subject.next(task);
      });
    return subject.asObservable();
  }

  // Get the last task that has been created
  getLastTask(): Observable<Task> {
    const subject = new Subject<Task>();
    this.getTasks().subscribe((tasks) => {
      subject.next(tasks[tasks.length - 1]);
    });
    return subject.asObservable();
  }

  // Remove/delete task by ID
  removeTask(id: number): void {
    // Make a delete request to the API with param id
    this.http.delete(this.path, {params: {id: String(id)}}).subscribe();
  }

  // Add task
  addTask(
    // tslint:disable-next-line:variable-name
    department_id: number,
    name: string,
    description: string,
    // tslint:disable-next-line:variable-name
    due_date: string
  ): void {
    this.http
      .post(this.path, {
        department_id,
        name,
        description,
        due_date,
      })
      .subscribe();
  }

  // Edit the name of the task
  editTaskTitle(index: number, title: string): void {
    // Update localy the data
    const task = Tasks[index];
    task.name = title;

    // Update the data in the database
    this.http.put(this.path, {name: title}).subscribe();
  }
}
