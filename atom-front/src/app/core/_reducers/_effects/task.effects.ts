import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/_reducers';
import { TaskModel } from '../../_models/task.model';
import { LoadingTask, TaskActionTypes, TaskLoaded, TaskRequested } from '../_actions/task.actions';
import { TaskService } from '../../_services/task.services';

@Injectable()
export class TaskEffects {

    loadTasks$ = createEffect(() => this.actions$.pipe(
        ofType<TaskRequested>(TaskActionTypes.TaskRequested),
        switchMap(() => {
            return this._taskService.getUserTasks().pipe(
                map((tasks: TaskModel[]) => {
                    this.store.dispatch(new TaskLoaded({ tasks }));
                    this.store.dispatch(new LoadingTask({ isLoading: false}));
                }), catchError((error) => {
                    this.store.dispatch(new LoadingTask({ isLoading: false}));
                    return of(error)
                }))
            //.subscribe();
        }),
    ), {
        dispatch: false,
    });

    constructor(
        private actions$: Actions,
        private _taskService: TaskService,
        private store: Store<AppState>
    ) {
    }



}
