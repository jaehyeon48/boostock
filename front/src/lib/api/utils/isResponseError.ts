export default function isResponseError(statusCode: number) {
	return statusCode >= 400;
}
