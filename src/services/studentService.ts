import { client } from '@/utils/mongoClient';
import { Student } from '@/models/student';
import { newFee } from '@/utils/fee';

const stuentCollection = client.db('ntutsu').collection<Student>('student');
const freshmenCollection = client.db('ntutsu').collection('freshmen');
import { transformOldPayment } from '@/utils/transform';

const unionFeeAmount = 300;
const unionFeeOperator = '系統';

async function getStudent({ id }: { id: string }): Promise<Student> {
	let student = await stuentCollection.findOne({ id });
	return student as Student;
}

const studentService = {
	search: async ({ keyword }: { keyword: string }): Promise<Student[]> => {
		let students = await stuentCollection
			.find({
				$or: [
					{
						unionsFeeRecords: {
							$elemMatch: { illustrate: { $regex: keyword } },
						},
					},
					{
						unionsFeeRecords: {
							$elemMatch: { methods: { $regex: keyword } },
						},
					},
					{
						unionsFeeRecords: {
							$elemMatch: { amount: { $regex: keyword } },
						},
					},
					{ id: { $regex: keyword } },
					{ name: { $regex: keyword } },
					{ class: { $regex: keyword } },
				],
			})
			.toArray();
		return students;
	},
	addUnionFee: async ({ id }: { id: string }): Promise<Student> => {
		await stuentCollection.updateOne(
			{ id },
			{
				$set: {
					unionsFeeRecords: [
						newFee({
							amount: unionFeeAmount,
							operator: unionFeeOperator,
							illustrate: '2022學生會費',
							methods: '現場',
							time: new Date().getTime(),
						}),
					],
				},
			},
			{ upsert: true }
		);
		return await getStudent({ id });
	},
	removeUnionFee: async ({ id }: { id: string }): Promise<Student> => {
		await stuentCollection.updateOne(
			{ id },
			{
				$set: {
					unionsFeeRecords: [],
				},
			},
			{ upsert: true }
		);
		return await getStudent({ id });
	},
	transformDB: async () => {
		let students = await freshmenCollection.find().toArray();

		const newStudents = students.map((student) =>
			transformOldPayment(student as any)
		);

		await stuentCollection.insertMany(newStudents);
	},
};

export default studentService;
