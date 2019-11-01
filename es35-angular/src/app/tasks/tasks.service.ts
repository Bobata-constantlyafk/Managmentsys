import {Injectable} from '@angular/core';
import {Task} from './tasks.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

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
    // Subject is used because this is a way to return from a HTTP request
    // since it is async and a evaluated value has to be returned
    const subject = new Subject<Task>();
    this.http
      .get<Task>(this.path, {params: {id: String(id)}})
      .subscribe((task) => {
        subject.next(task);
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
    department_id: number,
    name: string,
    description: string,
    due_date: string
  ): Observable<any> {
    return this.http.post(this.path, {
      department_id,
      name,
      description,
      due_date,
    });
  }

  // Edit the name of the task
  editTaskTitle(task: Task, title: string): void {
    // Update localy the data
    task.name = title;
    // Update the data in the database
    this.http
      .put(this.path, {name: title}, {params: {id: String(task.id)}})
      .subscribe();
  }

  // Get number of tasks per department
  getNumberOfTasksPerDepartment(): Observable<any> {
    const subject = new Subject<any>();
    this.getTasks().subscribe((tasks) => {
      const dict = {};
      tasks.forEach((task) => {
        const depId = task.department_id;
        dict[depId] = depId in dict ? dict[depId] + 1 : 1;
      });
      subject.next(dict);
    });
    return subject.asObservable();
  }
}
