import { Task } from '../models';
import { AbstractConnection, FirebaseConnection } from '../shared'

export class TaskRepository {
    private dbConnection: AbstractConnection;
    private entityName: string = "tasks";

    constructor() {
        this.dbConnection = FirebaseConnection.getInstance();
    }

    async createTask(task: Task): Promise<string> {
        return await this.dbConnection.insertOne(this.entityName, task);
    }

    async findTask(id: string): Promise<Task | null> {
        return await this.dbConnection.findOne(this.entityName, {id :id });
    }
    
    async getTasks(userEmail: string): Promise<Task | null> {
        return await this.dbConnection.findAllByField(this.entityName, {field: "userEmail", value: userEmail});
    }

    async updateTask(taskId: string, updatedData: Partial<Task>): Promise<void> {
        return await this.dbConnection.updateOne(this.entityName, {id: taskId, data: updatedData});
    }

    async deleteTask(taskId: string): Promise<void> {
        return await this.dbConnection.deleteOne(this.entityName, {id: taskId});
    }
}