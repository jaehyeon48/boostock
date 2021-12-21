import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';
import { OrderType } from '@src/types';

interface ITransaction {
	stockCode: string;
	type: OrderType;
	price: number;
	amount: number;
	createdAt: number;
}

export default async function getTransactions(
	startTime: number,
	endTime: number
): Promise<ITransaction[]> {
	const config = generateConfig({
		url: generateURL('user/transaction', `start=${startTime}&end=${endTime}`),
		method: 'get'
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		return res.data.log;
	} catch (error) {
		return [];
	}
}
