import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';

interface IDepositData {
	bank: string;
	bankAccount: string;
	changeValue: number;
}

export default async function deposit(postData: IDepositData): Promise<boolean> {
	const config = generateConfig({
		url: generateURL('user/balance/deposit'),
		method: 'post',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		data: postData
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		return true;
	} catch (error) {
		return false;
	}
}
