import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';

export default async function toggleFavorite(
	stockCode: string,
	shouldDeleteFavorite: boolean
): Promise<boolean> {
	const config = generateConfig({
		url: generateURL('user/favorite'),
		method: 'post',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		data: { stockCode, shouldDeleteFavorite }
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		return true;
	} catch (error) {
		return false;
	}
}
