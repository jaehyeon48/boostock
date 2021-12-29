import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';
import QueryString from 'qs';
import { IStockListItem } from '@src/types';
import { getBidAndAskOrders } from '@lib/api';
import { translateRequestData } from '@common/utils';
import { websocketAtom, stockListAtom, askOrdersAtom, bidOrdersAtom } from '@recoil';
import StockInfo from './stockInfo/StockInfo';
import SideBar from './sideBar/SideBar';
import Chart from './chart/Chart';
import Order from './order/Order';
import TradingLogs from './tradingLogs/TradingLogs';
import OrderBars from './orderBars/OrderBars';
import './Trade.scss';

interface IConnection {
	type: string;
	stockCode?: string;
}

const getStockState = (stockList: IStockListItem[], queryData: QueryString.ParsedQs) => {
	return stockList.find((stock: IStockListItem) => stock.code === queryData.code) ?? stockList[0];
};

const Trade = () => {
	const [stockList] = useRecoilState(stockListAtom);
	const setAskOrders = useSetRecoilState(askOrdersAtom);
	const setBidOrders = useSetRecoilState(bidOrdersAtom);
	const location = useLocation();
	const queryData = QueryString.parse(location.search, {
		ignoreQueryPrefix: true
	});
	const webSocket = useRecoilValue<WebSocket | null>(websocketAtom);
	const stockState = getStockState(stockList, queryData);
	const stockCode = stockState?.code;
	const stockId = stockState?.stockId;

	useEffect(() => {
		if (!stockId) return;
		(async () => {
			const { askOrders, bidOrders } = await getBidAndAskOrders(stockId);
			setAskOrders(askOrders.map(askOrder => ({ ...askOrder, amount: Number(askOrder.amount) })));
			setBidOrders(bidOrders.map(bidOrder => ({ ...bidOrder, amount: Number(bidOrder.amount) })));
		})();
	}, [stockId]);

	useEffect(() => {
		const connection = setInterval(() => {
			if (!stockCode || webSocket?.readyState !== 1) return;
			const openData: IConnection = {
				type: 'open',
				stockCode
			};
			webSocket.send(translateRequestData(openData));
			clearInterval(connection);
		});
		return () => {
			clearInterval(connection);
		};
	}, [webSocket, stockCode]);

	if (!stockCode) {
		return (
			<div className="trade__loading">
				<ImSpinner8 />
				<span>데이터 로딩중...</span>
			</div>
		);
	}

	return (
		<main className="trade">
			<section className="trade-container">
				<aside className="aside-bar">
					<SideBar />
				</aside>
				<section className="trade-body">
					<section className="trade-info">
						<StockInfo info={stockState} />
					</section>
					<section className="trade-chart">
						<Chart stockCode={stockCode} stockState={stockState} />
					</section>
					<section className="trade-status">
						<section className="trade-order-bars">
							<header className="order-bars-header">호가정보</header>
							<OrderBars previousClose={stockState.previousClose ?? 0} />
						</section>
						<section className="trade-order">
							<Order stockCode={stockCode} />
						</section>
					</section>
					<section className="trade-conclusion">
						<TradingLogs previousClose={stockState.previousClose} stockCode={stockCode} />
					</section>
				</section>
			</section>
		</main>
	);
};

export default Trade;
