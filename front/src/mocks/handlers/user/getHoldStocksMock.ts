import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';

export default function getHoldStocksMock(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	return res(
		ctx.json({
			holdStocks: [
				{
					amount: 9998888,
					average: 1000.3125214425293,
					code: 'HNX',
					nameKorean: '호눅스',
					nameEnglish: 'honux'
				},
				{
					amount: 9999999,
					average: 3841.773592866665,
					code: 'CRG',
					nameKorean: '크롱',
					nameEnglish: 'crong'
				},
				{
					amount: 10000000,
					average: 474.6310665384007,
					code: 'JK',
					nameKorean: 'JK',
					nameEnglish: '제이케이'
				},
				{
					amount: 9983899,
					average: 61938083.24766436,
					code: 'IVY',
					nameKorean: 'Ivy',
					nameEnglish: '아이비'
				}
			]
		})
	);
}
