import { CustomError, InternalServerError } from '@/models/errors';
import { ErrorRequestHandler } from 'express';

// Catch custom errors and send them back as the response
// If the error is not a custom error, treat it as internal server error
export const errorMiddleware: ErrorRequestHandler = (err, _, res, next) => {
	console.error(err);
	if (!(err instanceof CustomError)) {
		err = new InternalServerError();
	}
	const { message, code, statusCode } = err as CustomError;
	res.status(statusCode).send({ code, message });
	next();
};
