import BaseHttpError from './base';

export class HttpBadRequestError extends BaseHttpError{

    constructor(message = 'Bad Request'){
        super(message);
        this.status = 400;
    }
}

export class HttpUnauthorizedError extends BaseHttpError{
    constructor(message = 'Unauthorized'){
        super(message);
        this.status = 401;
    }
}

export class HttpNotFoundError extends BaseHttpError{
    constructor(message = 'Not Found'){
        super(message);
        this.status = 404;
    }
}

export class HttpInternalServerError extends BaseHttpError{
    constructor(message = 'Internal Error'){
        super(message);
        this.status = 500;
    }
}

export class HttpValidationError extends BaseHttpError{

    constructor(errors, message = 'Validation Error'){
        super(message);
        this.status = 400;
        this.errors = errors || [];
    }
}

export class HttpConflictError extends BaseHttpError{

    constructor(message = 'The request could not be completed due to a conflict with the current state of the resource.'){
        super(message);
        this.status = 409;
    }
}