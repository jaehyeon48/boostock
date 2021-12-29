import { IAskOrderItem } from '@src/types';
import { formatNumber } from '@common/utils';
import ITotalAndMaxAmount from './ITotalAndMaxAmount';

interface IProps {
	askOrder: IAskOrderItem;
	totalAndMaxAmount: ITotalAndMaxAmount;
	previousClose: number;
	volumeWidth: (amount: number, maxAmount: number) => string;
	setBidAskPrice: (price: number) => void;
	getPriceColorClass: (price: number, previousClose: number) => string;
}

const AskOrderBar = ({
	askOrder,
	totalAndMaxAmount,
	previousClose,
	volumeWidth,
	setBidAskPrice,
	getPriceColorClass
}: IProps) => {
	return (
		<tr>
			<td className="order-bar-row-amount sell-amount active">
				<button
					type="button"
					className="amount-button"
					onClick={() => setBidAskPrice(askOrder.price)}
					aria-label="ask-amount-bar"
				>
					<div
						style={{
							width: volumeWidth(askOrder.amount, totalAndMaxAmount.maxAmount)
						}}
						className="amount-bar sell-amount-bar"
					>
						&nbsp;
					</div>
					<p className="amount-text sell">{formatNumber(askOrder.amount)}</p>
				</button>
			</td>
			<td className="order-bar-row-price">
				<button
					type="button"
					className={`order-bar-row-price-data order-sell ${getPriceColorClass(
						askOrder.price,
						previousClose
					)}`}
					onClick={() => setBidAskPrice(askOrder.price)}
					aria-label="ask-price-bar"
				>
					{formatNumber(askOrder.price)}
				</button>
			</td>
			<td className="order-bar-row-amount buy-amount" />
		</tr>
	);
};

export default AskOrderBar;
