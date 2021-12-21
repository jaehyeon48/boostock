import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';
import { OrderType } from '@src/types';

export default async function cancelOrder(orderId: number, orderType: OrderType): Promise<boolean> {
	const config = generateConfig({
		url: generateURL('user/order', `id=${orderId}&type=${orderType}`),
		method: 'delete'
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		return true;
	} catch (error) {
		return false;
	}
}
