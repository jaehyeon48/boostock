import { SyntheticEvent } from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import { formatNumber } from '@common/utils';

interface IProps {
	orderType: string;
	orderPrice: number;
	orderAmount: number;
	isAmountError: boolean;
	askAvailable: number;
	bidAvailable: number;
	stockCode: string;
	setOrderPrice: (arg: number) => void;
	setOrderAmount: (arg: number) => void;
}

function orderAmountClass(isAmountError: boolean): string {
	let result = 'order-info-text-input';
	if (isAmountError) result += ' error';
	return result;
}

const OrderInputs = ({
	orderType,
	orderPrice,
	orderAmount,
	isAmountError,
	bidAvailable,
	askAvailable,
	stockCode,
	setOrderPrice,
	setOrderAmount
}: IProps) => {
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

	const calculateTotalOrderPrice = (price: number, amount: number) => {
		return price * amount;
	};

	return (
		<ul className="order-info-list">
			<li className="order-info-list-item">
				<span className="order-info-text">종목코드</span>
				<span className="order-stock-code">{stockCode}</span>
			</li>
			<li className="order-info-list-item">
				<span className="order-info-text">{orderType === '매수' ? '매수가능' : '매도가능'}</span>
				<span className="order-info-price-container">
					<span className="order-info-price">
						{orderType === '매수' ? formatNumber(bidAvailable) : formatNumber(askAvailable)}
					</span>
					<span className="order-info-won-text">{orderType === '매수' ? '원' : '주'}</span>
				</span>
			</li>
			<li className="order-info-list-item">
				<span className="order-info-text">{orderType === '매수' ? '매수가격' : '매도가격'}</span>
				<div>
					<input
						className="order-info-text-input"
						type="text"
						value={formatNumber(orderPrice)}
						onChange={handleOrderPrice}
						maxLength={13}
					/>
					<span className="order-info-won-text">원</span>
				</div>
			</li>
			<li className="order-info-list-item">
				<span className="order-info-text">주문수량</span>
				<div className="order-amount-container">
					<input
						className={orderAmountClass(isAmountError)}
						type="text"
						value={formatNumber(orderAmount)}
						onChange={handleOrderAmount}
						maxLength={5}
					/>
					<span className="order-info-won-text">주</span>
					{isAmountError && (
						<small className="order-error-notice">
							<span>
								<BiInfoCircle />
							</span>
							수량을 입력해 주세요.
						</small>
					)}
				</div>
			</li>
			<li className="order-info-list-item">
				<span className="order-info-text">주문총액</span>
				<div className="order-total-price-container">
					<span className="order-total-price">
						{formatNumber(calculateTotalOrderPrice(orderPrice, orderAmount))}
					</span>
					<span className="order-info-won-text">원</span>
				</div>
			</li>
		</ul>
	);
};

export default OrderInputs;
