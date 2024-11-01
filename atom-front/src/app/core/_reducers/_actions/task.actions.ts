import { Action } from '@ngrx/store';
import { TaskModel } from '../../_models/task.model';

export enum TaskActionTypes {
    TaskRequested = '[Request Task] Action',
    TaskLoaded = '[Load Task]  API',
    LoadingTask = '[Load Sales] Action',
    SaveTask = '[Save Task] API'
}
export class TaskRequested implements Action {
    readonly type = TaskActionTypes.TaskRequested;
    constructor() { }
}

export class TaskLoaded implements Action {
    readonly type = TaskActionTypes.TaskLoaded;
    constructor(public payload: { tasks: TaskModel[] }) { }
}

export class LoadingTask implements Action {
    readonly type = TaskActionTypes.LoadingTask;
    constructor(public payload: { isLoading: boolean }) { }
}

export class SaveTask implements Action {
    readonly type = TaskActionTypes.SaveTask;
    constructor(public payload: { task: TaskModel }) { }
}

export type TaskActions =
    SaveTask |
    TaskRequested |
    TaskLoaded |
    LoadingTask;