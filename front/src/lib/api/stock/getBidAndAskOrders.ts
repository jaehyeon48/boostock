import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';
import { IAskOrderItem, IBidOrderItem } from '@src/types';

interface IOrderApiRes {
	askOrders: IAskOrderItem[];
	bidOrders: IBidOrderItem[];
}

export default async function getBidAndAskOrders(stockId: number): Promise<IOrderApiRes> {
	const config = generateConfig({
		url: generateURL('stock/bid-ask', `stockId=${stockId}`),
		method: 'get'
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		return res.data;
	} catch (error) {
		return { askOrders: [], bidOrders: [] };
	}
}
