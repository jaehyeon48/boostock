import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';

export default function getTransactionsMock(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	return res(
		ctx.json({
			log: [
				{
					stockCode: 'IVY',
					amount: 1,
					price: 38460000,
					type: 2,
					createdAt: 1640081077486
				},
				{
					stockCode: 'HNX',
					amount: 2,
					price: 3109,
					type: 1,
					createdAt: 1640078698367
				},
				{
					stockCode: 'HNX',
					amount: 5,
					price: 3110,
					type: 1,
					createdAt: 1640078698323
				},
				{
					stockCode: 'HNX',
					amount: 2,
					price: 3113,
					type: 1,
					createdAt: 1640078698279
				},
				{
					stockCode: 'HNX',
					amount: 1,
					price: 3120,
					type: 1,
					createdAt: 1640078698240
				},
				{
					stockCode: 'HNX',
					amount: 2,
					price: 3120,
					type: 1,
					createdAt: 1640078682860
				},
				{
					stockCode: 'HNX',
					amount: 1,
					price: 3121,
					type: 1,
					createdAt: 1640078682821
				},
				{
					stockCode: 'HNX',
					amount: 3,
					price: 3125,
					type: 1,
					createdAt: 1640078682783
				},
				{
					stockCode: 'HNX',
					amount: 1,
					price: 3129,
					type: 1,
					createdAt: 1640078682743
				},
				{
					stockCode: 'HNX',
					amount: 3,
					price: 3133,
					type: 1,
					createdAt: 1640078682690
				},
				{
					stockCode: 'HNX',
					amount: 1,
					price: 3141,
					type: 1,
					createdAt: 1640078682614
				},
				{
					stockCode: 'HNX',
					amount: 5,
					price: 3144,
					type: 1,
					createdAt: 1640078682519
				},
				{
					stockCode: 'HNX',
					amount: 5,
					price: 3144,
					type: 1,
					createdAt: 1640078682480
				},
				{
					stockCode: 'HNX',
					amount: 1,
					price: 3145,
					type: 1,
					createdAt: 1640078682443
				},
				{
					stockCode: 'HNX',
					amount: 1,
					price: 3147,
					type: 1,
					createdAt: 1640078682388
				},
				{
					stockCode: 'HNX',
					amount: 5,
					price: 3150,
					type: 1,
					createdAt: 1640078682354
				},
				{
					stockCode: 'HNX',
					amount: 1,
					price: 3151,
					type: 1,
					createdAt: 1640078682315
				},
				{
					stockCode: 'HNX',
					amount: 5,
					price: 3153,
					type: 1,
					createdAt: 1640078682275
				},
				{
					stockCode: 'HNX',
					amount: 5,
					price: 3154,
					type: 1,
					createdAt: 1640078682235
				},
				{
					stockCode: 'HNX',
					amount: 1,
					price: 3154,
					type: 1,
					createdAt: 1640078682202
				},
				{
					stockCode: 'HNX',
					amount: 1,
					price: 3154,
					type: 1,
					createdAt: 1640078682163
				},
				{
					stockCode: 'HNX',
					amount: 5,
					price: 3156,
					type: 1,
					createdAt: 1640078682118
				},
				{
					stockCode: 'HNX',
					amount: 5,
					price: 3156,
					type: 1,
					createdAt: 1640078682080
				},
				{
					stockCode: 'HNX',
					amount: 5,
					price: 3156,
					type: 1,
					createdAt: 1640078682041
				},
				{
					stockCode: 'HNX',
					amount: 1,
					price: 3157,
					type: 1,
					createdAt: 1640078682002
				},
				{
					stockCode: 'HNX',
					amount: 1,
					price: 3171,
					type: 1,
					createdAt: 1640078681955
				},
				{
					stockCode: 'HNX',
					amount: 1,
					price: 3172,
					type: 1,
					createdAt: 1640078681909
				},
				{
					stockCode: 'HNX',
					amount: 3,
					price: 3176,
					type: 1,
					createdAt: 1640078681859
				},
				{
					stockCode: 'HNX',
					amount: 5,
					price: 3180,
					type: 1,
					createdAt: 1640078681822
				},
				{
					stockCode: 'HNX',
					amount: 1,
					price: 3180,
					type: 1,
					createdAt: 1640078681773
				}
			]
		})
	);
}
