import { rest } from 'msw';
import {
	getUserInfoMock,
	cancelOrderMock,
	checkEmailMock,
	depositMock,
	getBalanceMock,
	getFavoriteStocksMock,
	getHoldStocksMock,
	getOrdersMock,
	getTransactionsMock,
	orderMock,
	toggleFavoriteMock,
	withdrawMock
} from './user';
import { get1MinuteLogsMock, getBidAndAskOrdersMock, getDailyLogsMock } from './stock';

const SERVER_URL = 'http://localhost:3000';

const handlers = [
	rest.get(`${SERVER_URL}/api/user`, getUserInfoMock),
	rest.delete(`${SERVER_URL}/api/user/order`, cancelOrderMock),
	rest.get(`${SERVER_URL}/api/user/email`, checkEmailMock),
	rest.get(`${SERVER_URL}/api/user/balance`, getBalanceMock),
	rest.post(`${SERVER_URL}/api/user/balance/deposit`, depositMock),
	rest.get(`${SERVER_URL}/api/user/favorite`, getFavoriteStocksMock),
	rest.get(`${SERVER_URL}/api/user/hold`, getHoldStocksMock),
	rest.get(`${SERVER_URL}/api/user/order`, getOrdersMock),
	rest.get(`${SERVER_URL}/api/user/transaction`, getTransactionsMock),
	rest.post(`${SERVER_URL}/api/user/order`, orderMock),
	rest.post(`${SERVER_URL}/api/user/favorite`, toggleFavoriteMock),
	rest.post(`${SERVER_URL}/api/user/balance/withdraw`, withdrawMock),
	rest.get(`${SERVER_URL}/api/stock/log`, get1MinuteLogsMock),
	rest.get(`${SERVER_URL}/api/stock/log/daily`, getDailyLogsMock),
	rest.get(`${SERVER_URL}/api/stock/bid-ask`, getBidAndAskOrdersMock)
];

export default handlers;
