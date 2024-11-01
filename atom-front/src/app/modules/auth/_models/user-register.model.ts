import { UserModel } from "src/app/core/_models/user.model";

export class UserRegisterModel {
    email: string;
    name: string;
    lastname: string;

    constructor(obj: any = null) {
        this.email = obj?.email
        this.name = obj?.name
        this.lastname = obj?.lastname
    }

}
