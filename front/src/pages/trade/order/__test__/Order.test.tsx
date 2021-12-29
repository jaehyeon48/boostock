import { renderWithRecoil, screen, userEvent } from '@lib/testingLibrary';
import Order from '../Order';

test('Check whether Order view is rendered correctly', async () => {
	renderWithRecoil(<Order stockCode="HNX" />);

	const stockCodeContent = await screen.findByText('HNX');
	expect(stockCodeContent).toBeInTheDocument();

	const bidAvailable = await screen.findByLabelText('order-available');
	expect(bidAvailable).toHaveTextContent('1,253,667,212,174');

	const orderPriceInputBox = await screen.findByLabelText('Order price input box');
	const orderAmountInputBox = await screen.findByLabelText('Order amount input box');

	expect(orderPriceInputBox).toBeInTheDocument();
	expect(orderAmountInputBox).toBeInTheDocument();

	const resetBtn = await screen.findByRole('button', { name: /초기화/ });
	expect(resetBtn).toBeInTheDocument();

	const orderBtn = await screen.findByLabelText('order');
	expect(orderBtn).toBeInTheDocument();

	// to prevent "not wrapped in act(...)" error
	await screen.findByText('HNX');
});

test('Change order tab from bid to ask by clicking switch tab button', async () => {
	renderWithRecoil(<Order stockCode="HNX" />);

	const orderBtn = await screen.findByLabelText('order');
	expect(orderBtn).toHaveTextContent('매수');

	const askOrderTabBtn = await screen.findByLabelText('Ask order tab');
	userEvent.click(askOrderTabBtn);

	expect(orderBtn).toHaveTextContent('매도');

	// to prevent "not wrapped in act(...)" error
	await screen.findByText('HNX');
});

test('Clear all inputs by clicking the reset button', async () => {
	renderWithRecoil(<Order stockCode="HNX" />);

	const orderPriceInputBox = await screen.findByLabelText('Order price input box');
	const orderAmountInputBox = await screen.findByLabelText('Order amount input box');

	userEvent.type(orderPriceInputBox, '123');
	userEvent.type(orderAmountInputBox, '123');

	const totalAmount = await screen.findByLabelText('Total order amount');
	expect(totalAmount).toHaveTextContent('15,129');

	const resetBtn = await screen.findByRole('button', { name: /초기화/ });
	userEvent.click(resetBtn);

	expect(totalAmount).toHaveTextContent('0');
	expect(orderPriceInputBox).toHaveTextContent('');
	expect(orderAmountInputBox).toHaveTextContent('');
});

test('Show an error message when a user tries to order with zero amount', async () => {
	renderWithRecoil(<Order stockCode="HNX" />);

	const orderPriceInputBox = await screen.findByLabelText('Order price input box');
	const orderAmountInputBox = await screen.findByLabelText('Order amount input box');

	const orderBtn = await screen.findByLabelText('order');
	userEvent.click(orderBtn);

	const errorMessage = await screen.findByText('수량을 입력해 주세요.');
	expect(errorMessage).toBeInTheDocument();

	userEvent.type(orderPriceInputBox, '123');
	expect(errorMessage).toBeInTheDocument();

	userEvent.type(orderAmountInputBox, '123');
	expect(errorMessage).not.toBeInTheDocument();
});
