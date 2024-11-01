import { TaskModel } from '../_models/task.model';
import { TaskActions, TaskActionTypes } from './_actions/task.actions';

export interface TaskState {
    task: TaskModel | null;
    isLoading: boolean;
    taskList: TaskModel[];
    tasksCompleted: TaskModel[];
    tasksPending: TaskModel[];
}

export const initialTaskState: TaskState = {
    task: null,
    isLoading: false,
    taskList: [],
    tasksCompleted: [],
    tasksPending: []
};

export function taskReducer(state = initialTaskState, action: TaskActions): TaskState {

    switch (action.type) {
        case TaskActionTypes.TaskLoaded: {
            const tasks: TaskModel[] = action.payload.tasks;
            const tasksCompleted: TaskModel[] = tasks.filter(task => task.statusComplete === false);
            const tasksPending: TaskModel[] = tasks.filter(task => task.statusComplete === true);

            return {
                ...state,
                taskList: tasks,
                tasksCompleted: tasksCompleted,
                tasksPending: tasksPending
            };
        }

        case TaskActionTypes.TaskRequested: {
            return {
                ...state
            };
        }

        case TaskActionTypes.LoadingTask: {
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        }

        case TaskActionTypes.SaveTask: {
            let tasksCompleted: TaskModel[] = state.tasksCompleted;
            let tasksPending: TaskModel[] = state.tasksCompleted;

            if (action.payload.task.statusComplete) {
                tasksCompleted = [action.payload.task, ...state.tasksCompleted];
                console.log("TRUEEEEE")
            } else {
                console.log("FALSOOOO")
                tasksPending = [action.payload.task, ...state.tasksPending];
            }
            return {
                ...state,
                taskList: [action.payload.task, ...state.taskList],
                tasksCompleted: tasksCompleted,
                tasksPending: tasksPending
            };
        }

        default:
            return state;
    }
}
