import { AxiosRequestConfig } from 'axios';

export function generateConfig(
	options: AxiosRequestConfig = {},
	body: unknown = null
): AxiosRequestConfig {
	const requestConfig = {
		method: options.method ?? 'get',
		withCredentials: options.withCredentials ?? true,
		...options
	};

	if (body) {
		requestConfig.data = typeof body === 'object' ? JSON.stringify(body) : body;
	}

	return requestConfig;
}

export function generateURL(path: string, query?: string): string {
	const base = `${process.env.SERVER_URL}/api/${path}`;
	return query ? `${base}?${encodeURI(query)}` : base;
}
