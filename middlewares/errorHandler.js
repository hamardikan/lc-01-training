const errorHandler = (err, res, req, next) => {
    console.error(err);

    let status = 500;
    let message = "Internal server error";

    switch (err.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            status = 400;
            message = error.errors[0].message;
            break;

        case "InvalidToken":
        case "JsonWebTokenError":
        case "TokenExpiredError":
            status = 401;
            message = "Invalid token";
            break;

        case "InvalidCredentials":
            status = 400;
            message = "Invalid email/password";
            break;

        case "AuthenticationRequired":
            status = 401;
            messaage = "Authentication required";
            break;

        case "Forbidden":
            status = 403;
            message = "You are not authorized";
            break;

        case "NotFound":
            status = 404;
            message = "Data not found";
            break;

        case "EmailRequired":
            status = 400;
            message = "Email is required";
            break;
        case "PasswordRequired":
            status = 400;
            message = "Password is required";
            break;
        case "InvalidEmailFormat":
            status = 400;
            message = "Invalid email format";
            break;


        case "MissingParams":
            status = 400;
            message = "Missing required parameters";
            break;
        case "InvalidDataType":
            status = 400;
            message = "Invalid data type";

        case 'SequelizeConnectionError':
        case 'SequelizeConnectionRefusedError':
            status = 503;
            message = 'Database service unavailable';
            break;

    }

    res.status(status).json({message});
}