import React, { useEffect, useState } from 'react';
import TOAST from '@lib/toastify';
import { useRecoilState } from 'recoil';
import { IHoldStockItem, IOrderData } from '@src/types';
import { bidAskPriceAtom } from '@recoil';
import { order, getHoldStocks, getBalance } from '@lib/api';
import { Emitter } from '@common/utils';
import BidAskType from './BidAskType';
import BidAskInputs from './BidAskInputs';
import BidAskAction from './BidAskAction';

import './bidask.scss';

const BidAsk = ({ stockCode }: { stockCode: string }) => {
	const [bidAskType, setBidAskType] = useState<string>('매수');
	const [bidAskPrice, setBidAskPrice] = useRecoilState(bidAskPriceAtom);
	const [bidAskAmount, setBidAskAmount] = useState<number>(0);
	const [isAmountError, setIsAmountError] = useState<boolean>(false);
	const [bidAvailable, setBidAvailable] = useState<number>(0);
	const [askAvailable, setAskAvailable] = useState<number>(0);

	const handleSetBidAskType = (newType: string) => setBidAskType(newType);

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
		setBidAskPrice(0);
		setBidAskAmount(0);
		setIsAmountError(false);
	};

	const handleBidAsk = async () => {
		if (bidAskAmount === 0) {
			setIsAmountError(true);
			return;
		}

		const orderData: IOrderData = {
			stockCode,
			type: bidAskType === '매도' ? 1 : 2,
			option: 1,
			amount: bidAskAmount,
			price: bidAskPrice
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
	}, [bidAskType]);

	useEffect(() => {
		if (!isAmountError) return;
		if (bidAskAmount > 0) setIsAmountError(false);
	}, [bidAskAmount, isAmountError]);

	return (
		<div className="bidask-container">
			<BidAskType bidAskType={bidAskType} handleSetBidAskType={handleSetBidAskType} />
			<div className="bidask-info-container">
				<BidAskInputs
					bidAskType={bidAskType}
					bidAskPrice={bidAskPrice}
					bidAskAmount={bidAskAmount}
					isAmountError={isAmountError}
					askAvailable={askAvailable}
					bidAvailable={bidAvailable}
					stockCode={stockCode}
					setBidAskPrice={setBidAskPrice}
					setBidAskAmount={setBidAskAmount}
				/>
			</div>
			<BidAskAction
				bidAskType={bidAskType}
				isAmountError={isAmountError}
				handleReset={handleReset}
				handleBidAsk={handleBidAsk}
			/>
		</div>
	);
};

export default BidAsk;
