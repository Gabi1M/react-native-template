export class ApiError extends Error {
    public status: number;
    public backendError?: BackendError;

    constructor(status: number, backendError?: BackendError) {
        super();
        this.status = status;
        this.backendError = backendError;
    }
}

export interface BackendError {
    error: {
        message: string;
        code: string;
    };
}

export const getBackendError = (error: any) => (error.error ? (error as BackendError) : undefined);

export enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum Headers {
    AUTHORIZATION = 'Authorization',
    CONTENT_TYPE = 'Content-Type',
}

export enum ContentType {
    APPLICATION_JSON = 'application/json',
    TEXT_PLAIN = 'test/plain',
    MULTIPART_FORM_DATA = 'multipart/form-data',
}
