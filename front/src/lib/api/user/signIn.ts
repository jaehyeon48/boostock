import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';

export default async function signIn(authCode: string): Promise<boolean> {
	const config = generateConfig({
		url: generateURL('auth/github/signin'),
		method: 'post',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		data: { code: authCode }
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		return true;
	} catch (error) {
		return false;
	}
}
