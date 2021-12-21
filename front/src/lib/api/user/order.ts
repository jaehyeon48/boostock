import axios, { AxiosError } from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';
import { IOrderData } from '@src/types';

export default async function order(orderData: IOrderData): Promise<string> {
	const config = generateConfig({
		url: generateURL('user/order'),
		method: 'post',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		data: orderData
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error(res.data.message);

		return 'Order Succeeded';
	} catch (error) {
		return (error as AxiosError).response?.data.message;
	}
}
