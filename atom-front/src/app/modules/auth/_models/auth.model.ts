import { UserModel } from "src/app/core/_models/user.model";

export class AuthModel {
    user: UserModel;
    token: string;
    constructor(obj: any = null) {
        this.user = obj && obj.user || undefined;
        this.token = obj && obj.token || undefined;
    }
}
