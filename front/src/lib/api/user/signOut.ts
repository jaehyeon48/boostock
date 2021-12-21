import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';

export default async function signOut(): Promise<boolean> {
	const config = generateConfig({
		url: generateURL('auth/signout'),
		method: 'post'
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		return true;
	} catch (error) {
		return false;
	}
}
