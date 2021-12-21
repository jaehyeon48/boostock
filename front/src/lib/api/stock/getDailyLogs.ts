import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';
import { IDailyLog } from '@src/types';

interface DailyLogApiRes {
	code: string;
	logs: IDailyLog[];
}

export default async function getDailyLogs(stockCode: string): Promise<DailyLogApiRes> {
	const config = generateConfig({
		url: generateURL('stock/log/daily', `code=${stockCode}`),
		method: 'get'
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		return res.data;
	} catch (error) {
		return { code: '', logs: [] };
	}
}
