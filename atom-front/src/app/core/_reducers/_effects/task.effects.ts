import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/_reducers';
import { TaskModel } from '../../_models/task.model';
import { DeleteTask, LoadingTask, SaveTask, TaskActionTypes, TaskCreateRequested, TaskDeleteRequested, TaskLoaded, TaskRequested, TaskUpdateRequested, UpdateTask } from '../_actions/task.actions';
import { TaskService } from '../../_services/task.services';
import { LayoutUtilsServices, MessageType } from '../../_services/layout-utils.services';

@Injectable()
export class TaskEffects {

    loadTasks$ = createEffect(() => this.actions$.pipe(
        ofType<TaskRequested>(TaskActionTypes.TaskRequested),
        switchMap(() => {
            return this._taskService.getUserTasks().pipe(
                map((tasks: TaskModel[]) => {
                    this.store.dispatch(new TaskLoaded({ tasks }));
                    this.store.dispatch(new LoadingTask({ isLoading: false }));
                }), catchError((error) => {
                    this.store.dispatch(new LoadingTask({ isLoading: false }));
                    return of(error)
                }))
        }),
    ), {
        dispatch: false,
    });

    taskCreateRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType<TaskCreateRequested>(TaskActionTypes.TaskCreateRequested),
            switchMap(({ payload }) => {
                return this._taskService.createUserTask(payload.task).pipe(
                    map((res) => {
                        this.store.dispatch(new SaveTask({ task: res }))
                        this._layoutUtilsServices.showNotification(
                            `Se ha creado la tarea`,
                            MessageType.Sussess,
                            5000
                        );
                    }),
                    catchError((error) => {
                        this._layoutUtilsServices.showNotification(
                            `Ha ocurrido un error al tratar de crear la tarea`,
                            MessageType.Danger,
                            5000
                        );
                        return of(error);
                    })
                );
            })
        ),
        {
            dispatch: false,
        }
    );

    taskUpdateRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType<TaskUpdateRequested>(TaskActionTypes.TaskUpdateRequested),
            switchMap(({ payload }) => {
                return this._taskService.updateUserTask(payload.task, payload.taskId).pipe(
                    map((res) => {
                        this.store.dispatch(new UpdateTask({ task: res, taskId: payload.taskId }))
                        this._layoutUtilsServices.showNotification(
                            `Se ha actualizado la tarea`,
                            MessageType.Sussess,
                            5000
                        );
                    }),
                    catchError((error) => {
                        this._layoutUtilsServices.showNotification(
                            `Ha ocurrido un error al tratar de actualizar la tarea`,
                            MessageType.Danger,
                            5000
                        );
                        return of(error);
                    })
                );
            })
        ),
        {
            dispatch: false,
        }
    );

    taskDeleteRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType<TaskDeleteRequested>(TaskActionTypes.TaskDeleteRequested),
            switchMap(({ payload }) => {
                return this._taskService.deleteUserTask(payload.taskId).pipe(
                    map((res) => {
                        this.store.dispatch(new DeleteTask({ taskId: payload.taskId }))
                        this._layoutUtilsServices.showNotification(
                            `Se ha eliminado la tarea`,
                            MessageType.Sussess,
                            5000
                        );
                    }),
                    catchError((error) => {
                        this._layoutUtilsServices.showNotification(
                            `Ha ocurrido un error al tratar de eliminar la tarea`,
                            MessageType.Danger,
                            5000
                        );
                        return of(error);
                    })
                );
            })
        ),
        {
            dispatch: false,
        }
    );

    constructor(
        private actions$: Actions,
        private _taskService: TaskService,
        private store: Store<AppState>,
        private _layoutUtilsServices: LayoutUtilsServices,
    ) {
    }

}
