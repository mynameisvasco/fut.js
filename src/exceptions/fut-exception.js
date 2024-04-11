export class FutException extends Error {
    parameters;
    constructor(message, parameters) {
        super(message);
        this.parameters = parameters;
    }
}
