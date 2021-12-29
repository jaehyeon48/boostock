interface IProps {
	orderType: string;
	handleSetOrderType: (newType: string) => void;
}

function orderTypeClass(orderType: string, curType: string): string {
	let result = 'order-type-select-list-item';

	if (orderType === '매수') result += ' order-type-bid';
	if (orderType === '매도') result += ' order-type-ask';
	if (orderType === curType) result += ' on';

	return result;
}

const orderTypes = ['매수', '매도'];

const OrderType = ({ orderType, handleSetOrderType }: IProps) => {
	return (
		<ul className="order-type-select-list">
			{orderTypes.map(type => (
				<li key={type} className={`${orderTypeClass(type, orderType)}`}>
					<button
						className="order-type-select-list-btn"
						type="button"
						onClick={() => handleSetOrderType(type)}
						aria-label={`${type === '매수' ? 'Bid order tab' : 'Ask order tab'}`}
					>
						{type}
					</button>
				</li>
			))}
		</ul>
	);
};

export default OrderType;
