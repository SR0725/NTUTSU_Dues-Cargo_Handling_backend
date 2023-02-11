import { Student } from '@/models/student';
import { newFee } from '@/utils/fee';
const BASE_FEE = 300;

export function transformOldPayment(oldStudent: {
	_id: string;
	SID: string;
	name: string;
	schoolClass: string;
	paymentArray: {
		paymentName: string;
		paymentMethod: string;
		paymentNumber: number;
		paymentDate: number;
		paymentOperator: string;
	}[];
}): Student {
	const { SID, name, schoolClass, paymentArray } = oldStudent;

	const newStudent: Student = {
		id: SID,
		name,
		class: schoolClass,
		unionsFeeRecords: [],
		otherRecords: [],
	};
	if (
		paymentArray.some((payment) =>
			payment.paymentName ? payment.paymentName.includes('會費') : false
		)
	) {
		let payment = paymentArray.find((payment) =>
			payment.paymentName.includes('會費')
		);
		newStudent.unionsFeeRecords.push(
			newFee({
				amount: payment?.paymentNumber || BASE_FEE,
				operator: payment?.paymentOperator || '',
				illustrate: '2022學生會費',
				methods: payment?.paymentMethod || '',
				time: payment?.paymentDate || new Date().getTime(),
			})
		);
	}
	return newStudent;
}
