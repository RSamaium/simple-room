import { CustomError } from "./error";

export class NotAuthorized extends CustomError {
    status = 401;
    code = 'NOT_AUTHORIZED';
    message: string = "Not authorized";

    constructor(customMessage: any) {
        super(customMessage);
    }
}