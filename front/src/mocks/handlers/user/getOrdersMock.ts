import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';

export default function getOrdersMock(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	return res(
		ctx.json({
			pendingOrder: [
				{
					orderId: 10837284,
					stockCode: 'HNX',
					type: 2,
					amount: 1,
					price: 3106,
					createdAt: '2021-12-21T09:33:09.000Z'
				},
				{
					orderId: 10837283,
					stockCode: 'HNX',
					type: 2,
					amount: 1,
					price: 3106,
					createdAt: '2021-12-21T09:33:06.000Z'
				},
				{
					orderId: 10812691,
					stockCode: 'JK',
					type: 2,
					amount: 1,
					price: 523,
					createdAt: '2021-12-03T06:32:50.000Z'
				},
				{
					orderId: 10812690,
					stockCode: 'JK',
					type: 2,
					amount: 200,
					price: 523,
					createdAt: '2021-12-03T06:32:42.000Z'
				},
				{
					orderId: 10812689,
					stockCode: 'JK',
					type: 2,
					amount: 495,
					price: 523,
					createdAt: '2021-12-03T06:32:04.000Z'
				}
			]
		})
	);
}
