import { Action } from '@ngrx/store';
import { CreateTaskModel, TaskModel } from '../../_models/task.model';

export enum TaskActionTypes {
    TaskRequested = '[Request Task] Action',
    TaskCreateRequested = '[Create Request Task] Action',
    TaskUpdateRequested = '[Update Request Task] Action',
    TaskDeleteRequested = '[Delete Request Task] Action',
    TaskLoaded = '[Load Task]  API',
    LoadingTask = '[Load Sales] Action',
    SaveTask = '[Save Task] API',
    UpdateTask = '[Update Task] API',
    DeleteTask = '[Delete Task] API'
}
export class TaskRequested implements Action {
    readonly type = TaskActionTypes.TaskRequested;
    constructor() { }
}

export class TaskCreateRequested implements Action {
    readonly type = TaskActionTypes.TaskCreateRequested;
    constructor(public payload: { task: CreateTaskModel }) { }
}

export class TaskUpdateRequested implements Action {
    readonly type = TaskActionTypes.TaskUpdateRequested;
    constructor(public payload: { task: CreateTaskModel, taskId: string }) { }
}

export class TaskDeleteRequested implements Action {
    readonly type = TaskActionTypes.TaskDeleteRequested;
    constructor(public payload: { taskId: string }) { }
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

export class UpdateTask implements Action {
    readonly type = TaskActionTypes.UpdateTask;
    constructor(public payload: { task: CreateTaskModel, taskId: string }) { }
}

export class DeleteTask implements Action {
    readonly type = TaskActionTypes.DeleteTask;
    constructor(public payload: { taskId: string }) { }
}

export type TaskActions =
    TaskCreateRequested |
    TaskUpdateRequested |
    TaskDeleteRequested |
    DeleteTask |
    UpdateTask |
    SaveTask |
    TaskRequested |
    TaskLoaded |
    LoadingTask;