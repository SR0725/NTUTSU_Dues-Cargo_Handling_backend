import { client } from '@/utils/mongoClient';
import { Iou, LendStatus } from '@/models/Iou';
import { ObjectId } from 'mongodb';

const iouCollection = client.db('ntutsu').collection<Iou>('iou');

async function getIou(id: string): Promise<Iou> {
	let iou = await iouCollection.findOne({ id });
	return iou as Iou;
}

const iouService = {
	getHistory: async (): Promise<Iou[]> => {
		let Ious = await iouCollection.find().toArray();
		return Ious;
	},
	getLending: async (): Promise<Iou[]> => {
		let Ious = await iouCollection
			.find({
				$or: [
					{
						status: '尚未借出' as LendStatus,
					},
					{
						status: '正在被借出' as LendStatus,
					},
				],
			})
			.toArray();
		return Ious;
	},
	getNotFullFinish: async (): Promise<Iou[]> => {
		let Ious = await iouCollection
			.find({
				status: '歸還不完整' as LendStatus,
			})
			.toArray();
		return Ious;
	},
	addNewIou: async (newIou: Iou): Promise<Iou> => {
		newIou.id = new ObjectId().toString();
		newIou.status = '尚未借出' as LendStatus;
		newIou.returnItems = [];
		newIou.history = [
			{
				name: '建立',
				time: new Date().getTime(),
			},
		];

		await iouCollection.insertOne(newIou);
		return await newIou;
	},
	updateIou: async (id: string, rawIou: Iou): Promise<Iou> => {
		let iou = { ...rawIou, history: undefined };
		delete iou.history;

		await iouCollection.updateOne(
			{ id },
			{
				$set: iou,
				$pull: {
					history: {
						name: '修改',
						time: new Date().getTime(),
					},
				},
			}
		);
		return await getIou(id);
	},
	lendIou: async (id: string): Promise<Iou> => {
		await iouCollection.updateOne(
			{ id },
			{
				$set: {
					status: '正在被借出' as LendStatus,
				},
				$pull: {
					history: {
						name: '借出',
						time: new Date().getTime(),
					},
				},
			}
		);
		return await getIou(id);
	},
	returnIou: async (rawReturnIou: Iou): Promise<Iou> => {
		const returnIou = { ...rawReturnIou, history: undefined };
		delete returnIou.history;

		const originIou = await getIou(returnIou.id);
		let fullReturn = originIou.items.every((item) => {
			let returnItem = returnIou.items.find(
				(returnItem) => returnItem.name === item.name
			);
			if (!returnItem) {
				return true;
			}
			if (returnItem.amount !== item.amount) {
				return false;
			}
			return true;
		});
		let returnType = (
			fullReturn ? '已經成功歸還' : '歸還不完整'
		) as LendStatus;

		await iouCollection.updateOne(
			{ id: returnIou.id },
			{
				$set: {
					status: returnType,
					returnItems: returnIou.items,
				},
				$pull: {
					history: {
						name: '歸還',
						time: new Date().getTime(),
					},
				},
			}
		);
		return await getIou(returnIou.id);
	},
	revokeIou: async (id: string): Promise<Iou> => {
		await iouCollection.updateOne(
			{ id },
			{
				$set: {
					status: '撤銷' as LendStatus,
				},
				$pull: {
					history: {
						name: '撤銷',
						time: new Date().getTime(),
					},
				},
			}
		);
		return await getIou(id);
	},
};

export default iouService;
