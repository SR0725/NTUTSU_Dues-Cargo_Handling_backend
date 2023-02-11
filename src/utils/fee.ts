import { Fee } from '@/models/fee';
import { ObjectId } from 'mongodb';

export function newFee({
	amount,
	operator,
	illustrate,
	time,
	methods,
}: {
	amount: number;
	operator: string;
	illustrate: string;
	time: number;
	methods: string;
}): Fee {
	return {
		id: new ObjectId().toString(),
		amount,
		operator,
		illustrate,
		time,
		methods,
	};
}
