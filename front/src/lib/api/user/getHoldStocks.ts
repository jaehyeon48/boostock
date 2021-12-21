import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';
import { IHoldStockItem } from '@src/types';

export default async function getHoldStocks(): Promise<IHoldStockItem[]> {
	const config = generateConfig({
		url: generateURL('user/hold'),
		method: 'get'
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		return res.data.holdStocks;
	} catch (error) {
		return [];
	}
}
