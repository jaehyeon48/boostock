import { RestRequest, PathParams, ResponseComposition, DefaultRequestBody, RestContext } from 'msw';

export default function getUserInfoMock(
	req: RestRequest<never, PathParams>,
	res: ResponseComposition<DefaultRequestBody>,
	ctx: RestContext
) {
	return res(
		ctx.json({
			balance: 1253667212174,
			email: '123@123.123',
			socialGithub: 'jaehyeon48',
			userId: 580016,
			username: '050'
		})
	);
}
