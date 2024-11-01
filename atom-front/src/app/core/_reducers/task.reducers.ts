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
            if (action.payload.tasks) {
                const tasks: TaskModel[] = action.payload.tasks;
                const tasksCompleted: TaskModel[] = tasks.filter(task => task.statusComplete === true);
                const tasksPending: TaskModel[] = tasks.filter(task => task.statusComplete === false);

                return {
                    ...state,
                    taskList: tasks,
                    tasksCompleted: tasksCompleted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
                    tasksPending: tasksPending.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                };
            }
            return {
                ...state
            }

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
            if (action.payload.task.userEmail) {
                const tasks: TaskModel[] = [action.payload.task, ...state.taskList];
                const tasksCompleted: TaskModel[] = tasks.filter(task => task.statusComplete === true);
                const tasksPending: TaskModel[] = tasks.filter(task => task.statusComplete === false);

                return {
                    ...state,
                    taskList: tasks,
                    tasksCompleted: tasksCompleted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
                    tasksPending: tasksPending.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                };
            }
            return {
                ...state
            }
        }

        case TaskActionTypes.UpdateTask: {
            if (action.payload.taskId) {
                const tasks = state.taskList.map(task =>
                    task.id === action.payload.taskId
                        ? { ...task, ...action.payload.task }
                        : task
                )

                const tasksCompleted: TaskModel[] = tasks.filter(task => task.statusComplete === true);
                const tasksPending: TaskModel[] = tasks.filter(task => task.statusComplete === false);

                return {
                    ...state,
                    taskList: tasks,
                    tasksCompleted: tasksCompleted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
                    tasksPending: tasksPending.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                };
            }
            return {
                ...state
            }
        }

        case TaskActionTypes.DeleteTask: {
            if (action.payload.taskId) {
                const tasks = state.taskList.filter(task => task.id !== action.payload.taskId);
                const tasksCompleted: TaskModel[] = tasks.filter(task => task.statusComplete === true);
                const tasksPending: TaskModel[] = tasks.filter(task => task.statusComplete === false);

                return {
                    ...state,
                    taskList: tasks,
                    tasksCompleted: tasksCompleted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
                    tasksPending: tasksPending.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                };
            }
            return {
                ...state
            }
        }

        default:
            return state;
    }
}
