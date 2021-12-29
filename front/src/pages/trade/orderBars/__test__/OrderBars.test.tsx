import { renderWithRecoil, screen } from '@lib/testingLibrary';
import OrderBars from '../OrderBars';

test('Check whether OrderBars view is rendered correctly', async () => {
	renderWithRecoil(<OrderBars previousClose={0} />);

	const numOfAskOrders = 10;
	const numOfBidOrders = 10;

	const askAmountBars = await screen.findAllByLabelText('ask-amount-bar');
	expect(askAmountBars).toHaveLength(numOfAskOrders);

	const askPriceBars = await screen.findAllByLabelText('ask-price-bar');
	expect(askPriceBars).toHaveLength(numOfAskOrders);

	const bidAmountBars = await screen.findAllByLabelText('bid-amount-bar');
	expect(bidAmountBars).toHaveLength(numOfBidOrders);

	const bidPriceBars = await screen.findAllByLabelText('bid-price-bar');
	expect(bidPriceBars).toHaveLength(numOfBidOrders);

	const totalRemainingOrdersTitle = await screen.findByText('총잔량');
	expect(totalRemainingOrdersTitle).toBeInTheDocument();

	const totalAskAmountContent = await screen.findByText('32 주');
	expect(totalAskAmountContent).toBeInTheDocument();

	const totalBidAmountContent = await screen.findByText('23 주');
	expect(totalBidAmountContent).toBeInTheDocument();
});
