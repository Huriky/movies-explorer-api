module.exports = class ApiErrors extends Error {
    status;

    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message, errors = []) {
        return new ApiErrors(400, message, errors);
    }

    static UnauthorizedError(message = 'Не авторизован') {
        return new ApiErrors(401, message);
    }

    static NotAllowed() {
        return new ApiErrors(403, 'Доступ запрещен');
    }

    static NotFound(message = 'Не найдено', errors = []) {
        return new ApiErrors(404, message, errors);
    }

    static AlreadyExists() {
        return new ApiErrors(409, 'Пользователь с такой почтой уже существует');
    }

    static ServerError(message = 'На сервере произошла ошибка', errors = []) {
        return new ApiErrors(500, message, errors);
    }
};
