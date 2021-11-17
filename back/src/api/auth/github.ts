import express, { NextFunction, Request, Response } from 'express';
import { GithubService, UserService } from '@services/index';

export default (): express.Router => {
	const router = express.Router();

	router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
		const { code } = req.body;
		try {
			const accessToken = await GithubService.getAccessToken(code);
			const githubUserInfo = await GithubService.getUserInfo(accessToken);
			const userInfo = await UserService.getUserBySocialGithub(githubUserInfo.login);
			if (userInfo.userId === undefined) return;
			req.session.data = {
				userId: userInfo.userId,
				email: userInfo.email,
			};
			req.session.save((err) => {
				if (err) next(err);
				return res.status(200).json({ username: userInfo.username, email: userInfo.email, balance: userInfo.email });
			});
		} catch (error) {
			next(error);
		}
	});

	router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
		const { code, username, email } = req.body;
		try {
			const accessToken = await GithubService.getAccessToken(code);
			const githubUserInfo = await GithubService.getUserInfo(accessToken);
			const userInfo = await UserService.signUp({ username, email, socialGithub: githubUserInfo.login });
			req.session.data = {
				userId: userInfo.userId,
				email: userInfo.email,
			};
			req.session.save((err) => {
				if (err) next(err);
				return res.status(200).json({ username: userInfo.username, email: userInfo.email, balance: userInfo.email });
			});
		} catch (error) {
			next(error);
		}
	});

	return router;
};