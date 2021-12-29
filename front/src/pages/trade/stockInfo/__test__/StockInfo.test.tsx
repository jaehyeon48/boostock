import { renderWithRecoil, screen } from '@lib/testingLibrary';
import StockInfo from '../StockInfo';

test('Check whether StockInfo view is rendered correctly', async () => {
	renderWithRecoil(<StockInfo info={dummyStockState} />);

	const stockNameHeader = await screen.findByLabelText('stock-name');
	expect(stockNameHeader).toHaveTextContent('호눅스');

	const priceContent = await screen.findByText('₩3,109');
	expect(priceContent).toBeInTheDocument();

	const pricePercentContent = await screen.findByText('▲61.09%');
	expect(pricePercentContent).toBeInTheDocument();

	const highPriceContent = await screen.findByLabelText('high-price');
	expect(highPriceContent).toBeInTheDocument();

	const lowPriceContent = await screen.findByLabelText('low-price');
	expect(lowPriceContent).toBeInTheDocument();

	const amountContent = await screen.findByLabelText('amount-data');
	expect(amountContent).toBeInTheDocument();

	const volumeContent = await screen.findByLabelText('volume-data');
	expect(volumeContent).toBeInTheDocument();
});

const dummyStockState = {
	stockId: 1,
	code: 'HNX',
	nameKorean: '호눅스',
	nameEnglish: 'honux',
	charts: [
		{
			chartId: 1,
			type: 1,
			priceBefore: 3109,
			priceStart: 3109,
			priceEnd: 3109,
			priceHigh: 3109,
			priceLow: 3109,
			amount: 0,
			volume: 0
		},
		{
			chartId: 2,
			type: 1440,
			priceBefore: 1930,
			priceStart: 1935,
			priceEnd: 3109,
			priceHigh: 4290,
			priceLow: 1930,
			amount: 155325,
			volume: 339896502
		}
	],
	price: 3109,
	previousClose: 1930
};
