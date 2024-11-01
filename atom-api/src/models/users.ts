export class User {
    id: string;
    email: string;
    name: string;
    lastname: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Partial<User>) {
        this.id = data.id || '';
        this.email = data.email || '';
        this.name = data.name || '';
        this.lastname = data.lastname || '';
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    serialize() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            lastname: this.lastname,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}