import express, { NextFunction, Request, Response } from 'express';
import { UserFavoriteService } from '@services/index';
import sessionValidator from '@api/middleware/sessionValidator';

export default (): express.Router => {
	const router = express.Router();

	router.get('/favorite', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = res.locals;
			const userFavorite = await UserFavoriteService.readByUserId(userId);
			const favorite = userFavorite.map((elem) => elem.code);

			res.status(200).json({ favorite });
		} catch (error) {
			next(error);
		}
	});

	router.post('/favorite', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = res.locals;
			const { stockCode, shouldDeleteFavorite } = req.body;

			if (shouldDeleteFavorite) {
				await UserFavoriteService.removeUserFavorite(userId, stockCode);
				res.status(201).json({});
				return;
			}

			await UserFavoriteService.createUserFavorite(userId, stockCode);
			res.status(201).json({});
		} catch (error) {
			next(error);
		}
	});

	return router;
};
