import React, { useState, LegacyRef } from 'react';
import TOAST from '@lib/toastify';
import { toDateString } from '@common/utils';
import { useRecoilValue } from 'recoil';
import { OrderType, IStockListItem } from '@src/types';
import { stockListAtom } from '@recoil';
import { getOrders, cancelOrder } from '@lib/api';
import { NINE_HOURS_IN_MILLISECONDS } from '@common/constants';
import useInfinityScroll from './useInfinityScroll';

import './Orders.scss';

interface IOrder {
	orderId: number;
	orderTime: number;
	orderType: OrderType;
	stockCode: string;
	stockName: string;
	price: number;
	orderAmount: number;
}

const loadOrders = async (
	type: OrderType,
	stockList: IStockListItem[],
	orders: IOrder[],
	setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
	setLoading(true);
	const id = orders[orders.length - 1]?.orderId || 0;
	const pendingOrders = await getOrders(type, id);

	if (pendingOrders.length === 0) return;

	setOrders(prev => [
		...prev,
		...pendingOrders.map(pendingOrder => ({
			orderId: pendingOrder.orderId,
			orderTime: new Date(pendingOrder.createdAt).getTime() + NINE_HOURS_IN_MILLISECONDS,
			orderType: pendingOrder.type,
			stockCode: pendingOrder.stockCode,
			stockName: stockList.find(stock => stock.code === pendingOrder.stockCode)?.nameKorean ?? '',
			price: pendingOrder.price,
			orderAmount: pendingOrder.amount
		}))
	]);
	setLoading(false);
};

const Orders = ({ type }: { type: OrderType }) => {
	const stockList = useRecoilValue<IStockListItem[]>(stockListAtom);
	const [orders, setOrders] = useState<IOrder[]>([]);
	const [rootRef, targetRef, loading] = useInfinityScroll(
		loadOrders.bind(undefined, type, stockList, orders, setOrders)
	);

	const handleCancelOrder = async (orderId: number, orderType: OrderType) => {
		const isCancelSucceeded = await cancelOrder(orderId, orderType);

		if (isCancelSucceeded) {
			TOAST.success('주문이 취소되었습니다.');
			setOrders(prev => [...prev.filter(order => order.orderId !== orderId)]);
			return;
		}

		TOAST.error('주문이 취소하지 못했습니다. 잠시후 재시도해주세요.');
	};

	const getOrder = (order: IOrder) => {
		return (
			<tr className="my__item" key={order.orderId}>
				<td>{toDateString(order.orderTime)}</td>
				<td className="my__item-center">
					<span className="my__item-unit">{order.stockCode}</span>
					<br />
					<span className="my__item-title">{order.stockName}</span>
				</td>
				<td className="my__item-number">{order.price.toLocaleString()}</td>
				<td className="my__item-number">{order.orderAmount.toLocaleString()}</td>
				<td className="my__item-center">
					<button
						className="cancel-order-btn"
						type="button"
						onClick={() => handleCancelOrder(order.orderId, order.orderType)}
					>
						주문취소
					</button>
				</td>
			</tr>
		);
	};

	return (
		<table className="my-orders">
			<thead className="my__legend">
				<tr className="my-legend-row">
					<th className="my__legend-left">주문시간</th>
					<th className="my__legend-center">종목명</th>
					<th className="my__legend-number">주문가격 (원)</th>
					<th className="my__legend-number">주문수량 (주)</th>
					<th className="my__legend-center">&nbsp;</th>
				</tr>
			</thead>
			<tbody className="my-order-items" ref={rootRef as LegacyRef<HTMLTableSectionElement>}>
				{orders.length > 0 ? (
					orders.map((order: IOrder) => getOrder(order))
				) : (
					<tr className="my__item">
						<td className="my__item-center">주문 내역이 없습니다.</td>
					</tr>
				)}
				{loading === false && (
					<tr className="my__item" ref={targetRef as LegacyRef<HTMLTableRowElement>}>
						<td className="my__item-center" />
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default Orders;
