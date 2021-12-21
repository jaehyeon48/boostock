import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';

export default async function checkEmail(email: string): Promise<boolean> {
	const config = generateConfig({
		url: generateURL('user/email', `email=${email}`),
		method: 'get'
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		return true;
	} catch (error) {
		return false;
	}
}
