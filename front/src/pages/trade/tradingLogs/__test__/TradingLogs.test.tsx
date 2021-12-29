import { renderWithRecoil, screen, userEvent } from '@lib/testingLibrary';
import TradingLogs from '../TradingLogs';

test('Check whether TradingLogs view is rendered correctly', async () => {
	renderWithRecoil(<TradingLogs previousClose={0} stockCode="HNX" />);

	const numOfRealtimeLogs = 50;
	const tradingLogItems = await screen.findAllByLabelText('trading-logs-list-item');
	expect(tradingLogItems).toHaveLength(numOfRealtimeLogs);
});

test('Change tab from realtime to daily by clicking switch tab button', async () => {
	renderWithRecoil(<TradingLogs previousClose={0} stockCode="HNX" />);

	const numOfRealtimeLogs = 50;
	const logItemsBeforeSwitchingTab = await screen.findAllByLabelText('trading-logs-list-item');
	expect(logItemsBeforeSwitchingTab).toHaveLength(numOfRealtimeLogs);

	const dailyLogTabBtn = await screen.findByLabelText('Daily log tab');
	userEvent.click(dailyLogTabBtn);

	const logItemsAfterSwitchingTab = await screen.findByLabelText('trading-logs-list-item');
	expect(logItemsAfterSwitchingTab).toBeInTheDocument();
});
