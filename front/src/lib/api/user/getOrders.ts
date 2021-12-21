import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';
import { OrderType } from '@src/types';

interface IPendingOrder {
	orderId: number;
	stockCode: string;
	type: OrderType;
	price: number;
	amount: number;
	createdAt: number;
}

export default async function getOrders(
	orderType: OrderType,
	lastOrderId: number
): Promise<IPendingOrder[]> {
	const config = generateConfig({
		url: generateURL('user/order', `type=${orderType}&end=${lastOrderId}`),
		method: 'get'
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		return res.data.pendingOrder;
	} catch (error) {
		return [];
	}
}
