import { IouItem } from '@/models/IouItem';
import { IouHistory } from '@/models/IouHistory';
import { z } from 'zod';

/** - 借據
 * @param id - 唯一辨識碼
 * @param borrower - 借入人
 */
export type Iou = {
	id: string;
	borrower: string;
	image: string;
	items: IouItem[];
	returnItems: IouItem[];
	lendTime: number;
	returnTime: number;
	remark: string;
	operator: string;
	history: IouHistory[];
	status: LendStatus;
};

export enum LendStatus {
	'尚未借出' = '尚未借出',
	'正在被借出' = '正在被借出',
	'已經成功歸還' = '已經成功歸還',
	'歸還不完整' = '歸還不完整',
	'撤銷' = '撤銷',
}

export const iouZodSchema = z.object({
	id: z.string(),
	borrower: z.string(),
	image: z.string(),
	items: z
		.object({
			name: z.string(),
			amount: z.number(),
		})
		.array(),
	returnItems: z
		.object({
			name: z.string(),
			amount: z.number(),
		})
		.array(),
	lendTime: z.number(),
	returnTime: z.number(),
	remark: z.string(),
	operator: z.string(),
	history: z
		.object({
			name: z.string(),
			time: z.number(),
		})
		.array(),
	status: z.string(),
});
