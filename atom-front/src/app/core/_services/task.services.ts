import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from './http.services';
import { CreateTaskModel, TaskModel } from '../_models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
    constructor(
        private httpx: HttpService,
    ) { }

    getUserTasks(): Observable<TaskModel[]> {
        try {
            return this.httpx.get('list_task').pipe(
                map((res: TaskModel[]) => {
                    return res
                }));
        } catch (error) {
            return of()
        }
    }

    createUserTask(data: CreateTaskModel): Observable<TaskModel> {
        return this.httpx.post('save_task', data)
            .pipe(
                map(
                    (res: TaskModel) => new TaskModel(res)
                ));
    }

}