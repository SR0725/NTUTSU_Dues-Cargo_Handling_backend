import { validateRequest } from '@/middlewares/requestValidationMiddlewares';
import { Student } from '@/models/student';
import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// method: 'get'
// path: '/api/v1/student/search/:keyword'
// summary: '取得該關鍵字的搜尋結果'
const searchStudentRequestSchema = {
	params: z.object({ keyword: z.string() }),
};
router.get(
	'/search/:keyword',
	validateRequest(searchStudentRequestSchema),
	async function (req, res) {
		const {
			services: { student: studentService },
			params: { keyword },
		} = req;
		const students: Student[] = await studentService.search({ keyword });
		res.status(200).send(students);
	}
);

// method: 'post'
// path: '/api/v1/student/union-fee/:id'
// summary: '將該學號的學生添增會費繳費紀錄'
const addUnionFeeRequestSchema = {
	params: z.object({ id: z.string() }),
};
router.post(
	'/union-fee/:id',
	validateRequest(addUnionFeeRequestSchema),
	async function (req, res) {
		const {
			services: { student: studentService },
			params: { id },
		} = req;
		const student: Student = await studentService.addUnionFee({ id });
		res.status(200).send(student);
	}
);
// method: 'delete'
// path: '/api/v1/student/union-fee/:id'
// summary: '將該學號的學生移除會費繳費紀錄'
const deleteUnionFeeRequestSchema = {
	params: z.object({ id: z.string() }),
};
router.delete(
	'/union-fee/:id',
	validateRequest(deleteUnionFeeRequestSchema),
	async function (req, res) {
		const {
			services: { student: studentService },
			params: { id },
		} = req;
		const student: Student = await studentService.removeUnionFee({ id });
		res.status(200).send(student);
	}
);

// method: 'post'
// path: '/api/v1/student/transformDB'
// summary: '重置及轉移資料庫'
// router.post('/transformDB', async function (req, res) {
// 	const {
// 		services: { student: studentService },
// 	} = req;
// 	await studentService.transformDB();
// 	res.status(200).send('success');
// });

export default router;
