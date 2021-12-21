import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';

export default async function getFavoriteStocks(): Promise<string[]> {
	const config = generateConfig({
		url: generateURL('user/favorite'),
		method: 'get'
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		return res.data.favorite;
	} catch (error) {
		return [];
	}
}
