import {Injectable} from '@angular/core';
import {Employee} from './employees/employee';
import {Employees} from './employees/employees-mock';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private messageService: MessageService) {}
  getEmployees(): Observable<Employee[]> {
    this.messageService.add('EmployeeService: fetched employees');
    return of(Employees);
  }
}
