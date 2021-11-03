import React, { SyntheticEvent, useEffect, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { BiInfoCircle } from 'react-icons/bi';
import toast, { Toaster } from 'react-hot-toast';
import formatNumber from '@src/common/utils/formatNumber';

import style from './order.module.scss';

interface IOrderData {
	user_id: number;
	stock_id: number;
	type: number;
	option: number;
	amount: number;
	price: number;
}

function orderTypeClass(orderType: string, curType: string): string {
	let result = style['order-type-select-list-item'];

	if (orderType === '매수') result += ` ${style['order-type-bid']}`;
	if (orderType === '매도') result += ` ${style['order-type-ask']}`;
	if (orderType === '정정/취소') result += ` ${style['order-type-cancel']}`;
	if (orderType === curType) result += ` ${style.on}`;

	return result;
}

function orderActionClass(orderType: string): string {
	let result = style['order-action-btn'];

	if (orderType === '매수') result += ` ${style['bid-action']}`;
	if (orderType === '매도') result += ` ${style['ask-action']}`;
	if (orderType === '정정/취소') result += ` ${style['cancel-action']}`;

	return result;
}

function orderAmountClass(isAmountError: boolean): string {
	let result = style['order-info-text-input'];
	if (isAmountError) result += ` ${style.error}`;
	return result;
}

const orderTypes = ['매수', '매도', '정정/취소'];

const BidAsk = () => {
	const [orderType, setOrderType] = useState<string>('매수');
	const [orderOption, setOrderOption] = useState<string>('지정가');
	const [orderPrice, setOrderPrice] = useState<number>(0);
	const [orderAmount, setOrderAmount] = useState<number>(0);
	const [isAmountError, setIsAmountError] = useState<boolean>(false);

	const handleSetOrderType = (newType: string) => setOrderType(newType);

	const handleSetOrderOption = (e: SyntheticEvent) => {
		const target = e.target as HTMLInputElement;
		setOrderOption(target.value);
	};

	const handleOrderPrice = (e: SyntheticEvent) => {
		const target = e.target as HTMLInputElement;
		const price = Number(target.value.replace(/,/g, ''));

		if (Number.isNaN(price)) return;
		setOrderPrice(price);
	};

	const handleOrderAmount = (e: SyntheticEvent) => {
		const target = e.target as HTMLInputElement;
		const amount = Number(target.value.replace(/,/g, ''));

		if (Number.isNaN(amount)) return;
		setOrderAmount(amount);
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
			user_id: 1,
			stock_id: 1,
			type: orderType === '매도' ? 0 : 1,
			option: orderOption === '지정가' ? 0 : 1,
			amount: orderAmount,
			price: orderPrice,
		};

		const config = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderData),
		};

		try {
			const res = await fetch(
				`${process.env.SERVER_URL}/api/order`,
				config,
			);
			const data = await res;

			if (data.status !== 200) throw new Error();
			handleReset();
			toast.success('주문이 접수되었습니다.');
		} catch (error) {
			// 추후 상세 에러 처리 요망
			toast.error('주문 접수에 실패했습니다. \n\n다시 시도해 주세요.', {
				style: {
					textAlign: 'center',
					maxWidth: '236px',
				},
			});
		}
	};

	const calculateTotalOrderPrice = (price: number, amount: number) => {
		return price * amount;
	};

	useEffect(() => {
		handleReset();
	}, [orderType, orderOption]);

	useEffect(() => {
		if (!isAmountError) return;
		if (orderAmount > 0) setIsAmountError(false);
	}, [orderAmount, isAmountError]);

	return (
		<div className={style['order-container']}>
			<Toaster />
			<ul className={style['order-type-select-list']}>
				{orderTypes.map((type) => (
					<li
						key={type}
						className={`${orderTypeClass(type, orderType)}`}
					>
						<button
							className={style['order-type-select-list-btn']}
							type="button"
							onClick={() => handleSetOrderType(type)}
						>
							{type}
						</button>
					</li>
				))}
			</ul>
			<div className={style['order-info-container']}>
				{orderType !== '정정/취소' && (
					<ul className={style['order-info-list']}>
						<li className={style['order-info-list-item']}>
							<span className={style['order-info-text']}>
								주문구분
							</span>
							<span>
								<input
									id="order-option-designated"
									className={
										style['order-option-radio-input']
									}
									type="radio"
									name="order-option"
									value="지정가"
									checked={orderOption === '지정가'}
									onChange={handleSetOrderOption}
								/>
								{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
								<label
									className={style['order-option-label']}
									htmlFor="order-option-designated"
								>
									지정가
								</label>
								<input
									id="order-option-market"
									className={
										style['order-option-radio-input']
									}
									type="radio"
									name="order-option"
									value="시장가"
									checked={orderOption === '시장가'}
									onChange={handleSetOrderOption}
								/>
								{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
								<label
									htmlFor="order-option-market"
									className={style['order-option-label']}
								>
									시장가
								</label>
							</span>
						</li>
						<li className={style['order-info-list-item']}>
							<span className={style['order-info-text']}>
								{orderType === '매수' ? '매수가능' : '매도가능'}
							</span>
							<span
								className={style['order-info-price-container']}
							>
								<span className={style['order-info-price']}>
									123,456,789
								</span>
								<span className={style['order-info-won-text']}>
									{orderType === '매수' ? '원' : '주'}
								</span>
							</span>
						</li>
						{orderOption === '지정가' && (
							<li className={style['order-info-list-item']}>
								<span className={style['order-info-text']}>
									{orderType === '매수'
										? '매수가격'
										: '매도가격'}
								</span>
								<div>
									<input
										className={
											style['order-info-text-input']
										}
										type="text"
										dir="rtl"
										value={formatNumber(orderPrice)}
										onChange={handleOrderPrice}
									/>
									<span
										className={style['order-info-won-text']}
									>
										원
									</span>
								</div>
							</li>
						)}
						<li className={style['order-info-list-item']}>
							<span className={style['order-info-text']}>
								주문수량
							</span>
							<div className={style['order-amount-container']}>
								<input
									className={orderAmountClass(isAmountError)}
									type="text"
									dir="rtl"
									value={formatNumber(orderAmount)}
									onChange={handleOrderAmount}
								/>
								<span className={style['order-info-won-text']}>
									주
								</span>
								{isAmountError && (
									<small
										className={style['order-error-notice']}
									>
										<span>
											<BiInfoCircle />
										</span>
										수량을 입력해 주세요.
									</small>
								)}
							</div>
						</li>
						{orderOption === '지정가' && (
							<li className={style['order-info-list-item']}>
								<span className={style['order-info-text']}>
									주문총액
								</span>
								<div
									className={
										style['order-total-price-container']
									}
								>
									<span
										className={style['order-total-price']}
									>
										{formatNumber(
											calculateTotalOrderPrice(
												orderPrice,
												orderAmount,
											),
										)}
									</span>
									<span
										className={style['order-info-won-text']}
									>
										원
									</span>
								</div>
							</li>
						)}
					</ul>
				)}
			</div>
			<div className={style['order-action-container']}>
				<button
					onClick={handleReset}
					className={style['order-reset-btn']}
					type="button"
				>
					<span className={style['order-action-reset-icon']}>
						<GrPowerReset />
					</span>
					초기화
				</button>
				<button
					className={orderActionClass(orderType)}
					type="button"
					onClick={handleOrder}
					disabled={isAmountError}
				>
					{orderType}
				</button>
			</div>
		</div>
	);
};

export default BidAsk;