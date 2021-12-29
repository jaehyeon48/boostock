import { useEffect, useState } from 'react';
import TOAST from '@lib/toastify';
import { useRecoilState } from 'recoil';
import { IHoldStockItem, IOrderData } from '@src/types';
import { bidAskPriceAtom } from '@recoil';
import { order, getHoldStocks, getBalance } from '@lib/api';
import { Emitter } from '@common/utils';
import OrderType from './OrderType';
import OrderInputs from './OrderInputs';
import OrderActions from './OrderActions';

import './order.scss';

const Order = ({ stockCode }: { stockCode: string }) => {
	const [orderType, setOrderType] = useState<string>('매수');
	const [orderPrice, setOrderPrice] = useRecoilState(bidAskPriceAtom);
	const [orderAmount, setOrderAmount] = useState<number>(0);
	const [isAmountError, setIsAmountError] = useState<boolean>(false);
	const [bidAvailable, setBidAvailable] = useState<number>(0);
	const [askAvailable, setAskAvailable] = useState<number>(0);

	const handleSetOrderType = (newType: string) => setOrderType(newType);

	const setUserAvailableAmount = async (askAvailable: number | null = null) => {
		setBidAvailable((await getBalance(0, 0))?.balance ?? 0);
		if (askAvailable) {
			setAskAvailable(askAvailable);
			return;
		}
		setAskAvailable(
			(await getHoldStocks()).filter(({ code }) => code === stockCode)[0]?.amount ?? 0
		);
	};

	const handleReset = () => {
		setOrderPrice(0);
		setOrderAmount(0);
		setIsAmountError(false);
	};

	const handleOrder = async () => {
		if (orderAmount === 0) {
			setIsAmountError(true);
			return;
		}

		const orderData: IOrderData = {
			stockCode,
			type: orderType === '매도' ? 1 : 2,
			option: 1,
			amount: orderAmount,
			price: orderPrice
		};

		const orderRes = await order(orderData);

		if (orderRes === 'Order Succeeded') {
			handleReset();
			await setUserAvailableAmount();
			TOAST.success('주문이 접수되었습니다.');
			return;
		}

		if (orderRes === 'Not Correct Quote Digit') {
			TOAST.error('주문 접수에 실패했습니다. 호가 단위를 확인해주세요.');
			return;
		}

		if (orderRes === 'Not Enough Balance') {
			TOAST.error('주문 접수에 실패했습니다. 잔액이 부족합니다.');
			return;
		}

		TOAST.error('주문 접수에 실패했습니다. 다시 시도해 주세요.');
	};

	useEffect(() => {
		const listener = async (stockCode: string, holdStockList: IHoldStockItem[]) => {
			const [holdStock] = holdStockList.filter(({ code }) => code === stockCode);
			setUserAvailableAmount(holdStock?.amount ?? 0);
		};

		Emitter.on('CONCLUDED_ORDER', listener);

		return () => {
			Emitter.off('CONCLUDED_ORDER', listener);
		};
	}, []);

	useEffect(() => {
		(async () => {
			await setUserAvailableAmount();
		})();
	}, []);

	useEffect(() => {
		handleReset();
	}, [orderType]);

	useEffect(() => {
		if (!isAmountError) return;
		if (orderAmount > 0) setIsAmountError(false);
	}, [orderAmount, isAmountError]);

	return (
		<div className="order-container">
			<OrderType orderType={orderType} handleSetOrderType={handleSetOrderType} />
			<div className="order-info-container">
				<OrderInputs
					orderType={orderType}
					orderPrice={orderPrice}
					orderAmount={orderAmount}
					isAmountError={isAmountError}
					askAvailable={askAvailable}
					bidAvailable={bidAvailable}
					stockCode={stockCode}
					setOrderPrice={setOrderPrice}
					setOrderAmount={setOrderAmount}
				/>
			</div>
			<OrderActions
				orderType={orderType}
				isAmountError={isAmountError}
				handleReset={handleReset}
				handleOrder={handleOrder}
			/>
		</div>
	);
};

export default Order;
