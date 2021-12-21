import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';
import { IChartItem, ChartType } from '@src/types';

interface DailyLogApiRes {
	log: IChartItem[];
}

export default async function get1MinuteLogs(
	stockCode: string,
	type: ChartType,
	startDate: number,
	endDate: number
): Promise<DailyLogApiRes> {
	const config = generateConfig({
		url: generateURL(
			'stock/log',
			`code=${stockCode}&type=${type}&start=${startDate}&end=${endDate}`
		),
		method: 'get'
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		return res.data;
	} catch (error) {
		return { log: [] };
	}
}
