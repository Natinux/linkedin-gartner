export default class BaseHttpError{

    toJson(){
        return {
            error: this.message,
            status: this.status
        };
    }

    toJsonString(){
        return JSON.stringify(this.toJson());
    }
}