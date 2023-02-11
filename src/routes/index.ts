import studentRoute from '@/routes/studentRoute';
import iouRoute from '@/routes/iouRoute';
import { Router } from 'express';

const router = Router();

router.use('/student', studentRoute);
router.use('/iou', iouRoute);

// Health Check Endpoint
router.get('/healthcheck', (req, res) => {
	res.status(200).json({
		error: false,
		message: 'success',
	});
});

export default router;
