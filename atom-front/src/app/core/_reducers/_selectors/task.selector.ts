import { createSelector } from '@ngrx/store';
import { TaskState } from '../task.reducers';
import { TaskModel } from '../../_models/task.model';

export const selectTaskState = (state: any) => state.task;

export const currentTaskList = createSelector(selectTaskState, (task: TaskState) => task.taskList);

export const currentTaskCompleted = createSelector(selectTaskState, (task: TaskState) => task.tasksCompleted);

export const currentTaskPending = createSelector(selectTaskState, (task: TaskState) => task.tasksPending);

export const currentIsLoad = createSelector(selectTaskState, (task: TaskState) => task.isLoading);