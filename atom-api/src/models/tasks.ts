export class Task {
    id: string;
    title: string;
    description: string;
    userEmail: string;
    statusComplete: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Partial<Task>) {
        this.id = data.id || '';
        this.title = data.title || '';
        this.description = data.description || '';
        this.userEmail = data.userEmail || '';
        this.statusComplete = data.statusComplete || false;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    serialize() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            userEmail: this.userEmail,
            statusComplete: this.statusComplete,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}