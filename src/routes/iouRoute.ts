import { validateRequest } from '@/middlewares/requestValidationMiddlewares';
import { Iou, iouZodSchema } from '@/models/Iou';
import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// method: 'get'
// path: '/api/v1/iou/history'
// summary: '取得所有借據'
router.get('/history', async function (req, res) {
	const {
		services: { iou: iouService },
	} = req;
	const ious: Iou[] = await iouService.getHistory();
	res.status(200).send(ious);
});

// method: 'get'
// path: '/api/v1/iou/lending'
// summary: '取得所有正在借出或未被借出的借據'
router.get('/lending', async function (req, res) {
	const {
		services: { iou: iouService },
	} = req;
	const ious: Iou[] = await iouService.getLending();
	res.status(200).send(ious);
});

// method: 'get'
// path: '/api/v1/iou/not-full-finish'
// summary: '取得所有未完全歸還的借據'
router.get('/not-full-finish', async function (req, res) {
	const {
		services: { iou: iouService },
	} = req;
	const ious: Iou[] = await iouService.getNotFullFinish();
	res.status(200).send(ious);
});

// method: 'post'
// path: '/api/v1/iou/new'
// summary: '新增借據'

const iouRequestSchema = {
	body: z.object({
		iou: iouZodSchema,
	}),
};
router.post(
	'/new',
	validateRequest(iouRequestSchema),
	async function (req, res) {
		const {
			services: { iou: iouService },
			body: { iou },
		} = req;
		const newIou: Iou = await iouService.addNewIou(iou as Iou);
		res.status(200).send(newIou);
	}
);

// method: 'put'
// path: '/api/v1/iou/:id'
// summary: '更新借據'
const updateIouRequestSchema = {
	params: z.object({
		id: z.string(),
	}),
	body: z.object({
		iou: iouZodSchema,
	}),
};
router.put(
	'/:id',
	validateRequest(updateIouRequestSchema),
	async function (req, res) {
		const {
			services: { iou: iouService },
			params: { id },
      body: { iou },
		} = req;
		const lendIou: Iou = await iouService.updateIou(id, iou as Iou);
		res.status(200).send(lendIou);
	}
);

// method: 'post'
// path: '/api/v1/iou/lend/:id'
// summary: '確認借出借據'
const lendIouRequestSchema = {
	params: z.object({
		id: z.string(),
	}),
};
router.post(
	'/lend/:id',
	validateRequest(lendIouRequestSchema),
	async function (req, res) {
		const {
			services: { iou: iouService },
			params: { id },
		} = req;
		const lendIou: Iou = await iouService.lendIou(id);
		res.status(200).send(lendIou);
	}
);

// method: 'post'
// path: '/api/v1/iou/return'
// summary: '確認歸還借據'
router.post(
	'/return',
	validateRequest(iouRequestSchema),
	async function (req, res) {
		const {
			services: { iou: iouService },
			body: { iou },
		} = req;
		const returnIou: Iou = await iouService.returnIou(iou as Iou);
		res.status(200).send(returnIou);
	}
);

// method: 'delete'
// path: '/api/v1/iou/:id'
// summary: '撤銷借據'
const deleteIouRequestSchema = {
	params: z.object({
		id: z.string(),
	}),
};
router.delete(
	'/:id',
	validateRequest(deleteIouRequestSchema),
	async function (req, res) {
		const {
			services: { iou: iouService },
			params: { id },
		} = req;
		const revokeIou: Iou = await iouService.revokeIou(id);
		res.status(200).send(revokeIou);
	}
);

export default router;
