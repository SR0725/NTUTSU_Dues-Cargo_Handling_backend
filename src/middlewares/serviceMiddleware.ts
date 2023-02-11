import studentService from '@/services/studentService';
import iouService from '@/services/iouService';
import { RequestHandler } from 'express';

// Inject services into request
export const serviceMiddleware: RequestHandler = (req, _, next) => {
	req.services = {
		student: studentService,
		iou: iouService,
	};
	next();
};
