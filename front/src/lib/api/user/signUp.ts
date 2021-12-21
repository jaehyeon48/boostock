import axios from 'axios';
import { generateConfig, generateURL, isResponseError } from '@lib/api';

interface INewUserData {
	code: string;
	username: string;
	email: string;
}

export default async function signUp(newUserData: INewUserData): Promise<boolean> {
	const config = generateConfig({
		url: generateURL('auth/github/signup'),
		method: 'post',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		data: newUserData
	});

	try {
		const res = await axios(config);
		if (isResponseError(res.status)) throw new Error();

		return true;
	} catch (error) {
		return false;
	}
}
