import { User } from '../models';
import { AbstractConnection, FirebaseConnection } from '../shared'

export class UserRepository {
    private dbConnection: AbstractConnection;
    private entityName: string = "users";

    constructor() {
        this.dbConnection = FirebaseConnection.getInstance();
    }

    async getUserById(id: string): Promise<User | null> {
        return await this.dbConnection.findOne(this.entityName, { id });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.dbConnection.findByField(this.entityName, {field: "email", value: email});
    }

    async createUser(user: User): Promise<string> {
        return await this.dbConnection.insertOne(this.entityName, user);
    }

}