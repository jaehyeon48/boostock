import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';

export default function getDailyLogsMock(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	return res(
		ctx.json({
			code: 'HNX',
			logs: [
				{
					_id: '61a9d0919b6be67078a337bf',
					code: 'HNX',
					priceEnd: 1935,
					amount: 33124610,
					createdAt: 1638316799217
				}
			]
		})
	);
}
