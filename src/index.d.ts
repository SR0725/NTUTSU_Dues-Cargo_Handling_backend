import studentService from '@/services/studentService';
import iouService from '@/services/iouService';

declare global {
	namespace Express {
		export interface Request {
			z;
			services: {
				student: typeof studentService;
				iou: typeof iouService;
			};
		}

		interface User {
			id: string;
		}
	}
}
