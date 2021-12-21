import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';
import { IHistory } from '@src/types';

interface IBalanceResponseData {
	balance: number;
	log: IHistory[];
}

export default async function getBalance(
	beforeTime: number,
	currentTime: number
): Promise<IBalanceResponseData | null> {
	const config = generateConfig({
		url: generateURL('user/balance', `start=${beforeTime}&end=${currentTime}`)
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		const resData = res.data;
		return resData;
	} catch (error) {
		return null;
	}
}
