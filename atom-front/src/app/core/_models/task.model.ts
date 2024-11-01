import { BaseModel } from "./base.model";

export class TaskModel extends BaseModel {
    title: string
    description: string
    statusComplete: boolean
    userEmail: string
    constructor(obj: any = null) {
        super(obj)
        this.title = obj?.title
        this.description = obj?.description
        this.statusComplete = obj?.statusComplete
        this.userEmail = obj?.userEmail
    }
}

export class CreateTaskModel {
    title: string
    description: string
    statusComplete: boolean
    constructor(obj: any = null) {
        this.title = obj?.title
        this.description = obj?.description
        this.statusComplete = obj?.statusComplete
    }
}

