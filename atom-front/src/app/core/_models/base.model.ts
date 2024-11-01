export class BaseModel {
    id: string
    createdAt: string
    updatedAt: string

    constructor(obj: any = null) {
        this.id = obj?.id || obj?._id || null
        this.createdAt = obj?.createdAt
        this.updatedAt = obj?.updatedAt
    }
}
