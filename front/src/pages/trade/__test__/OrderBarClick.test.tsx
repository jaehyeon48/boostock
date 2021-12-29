import { renderWithRecoil, screen, userEvent } from '@lib/testingLibrary';
import { OrderPriceContextProvider } from '@pages/contexts';
import OrderBars from '../orderBars/OrderBars';
import Order from '../order/Order';

test('Type order price when a user clicks an order bar', async () => {
	renderWithRecoil(
		<OrderPriceContextProvider>
			<OrderBars previousClose={0} />
			<Order stockCode="HNX" />
		</OrderPriceContextProvider>
	);

	const askAmountBars = await screen.findAllByLabelText('ask-amount-bar');
	const askPriceBars = await screen.findAllByLabelText('ask-price-bar');
	const bidAmountBars = await screen.findAllByLabelText('bid-amount-bar');
	const bidPriceBars = await screen.findAllByLabelText('bid-price-bar');

	const orderPriceInputBox = await screen.findByLabelText('Order price input box');
	userEvent.click(askAmountBars[0]);
	expect(orderPriceInputBox).toHaveValue('39,890,000');

	userEvent.click(askPriceBars[0]);
	expect(orderPriceInputBox).toHaveValue('39,890,000');

	userEvent.click(bidAmountBars[0]);
	expect(orderPriceInputBox).toHaveValue('39,240,000');

	userEvent.click(bidPriceBars[0]);
	expect(orderPriceInputBox).toHaveValue('39,240,000');
});
