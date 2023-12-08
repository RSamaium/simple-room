export class CustomError extends Error {
    status = 500;
    code = 'INTERNAL_SERVER_ERROR'
    message: string = "Internal Server error";

    constructor(private customMessage: any) {
        super(customMessage);
    }

    toObject() {
        return {
            message: this.customMessage || this.message,
            status: this.status,
            code: this.code
        }
    }
}