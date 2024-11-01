import { BaseModel } from "./base.model";

export class UserModel extends BaseModel {

    email: string;
    name: string;
    lastname: string;

    constructor(obj: any = null) {
        super(obj)
        this.email = obj?.email
        this.name = obj?.name
        this.lastname = obj?.lastname
    }


}
