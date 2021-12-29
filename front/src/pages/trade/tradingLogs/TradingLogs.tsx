import { useState } from 'react';

import './tradingLogs.scss';
import Ticks from './Ticks';
import Days from './Days';

export enum TAB {
	TICK = '체결',
	DAY = '일별'
}

interface Props {
	stockCode: string;
	previousClose: number;
}

const TradingLogs = ({ previousClose, stockCode }: Props) => {
	const [tab, setTab] = useState(TAB.TICK);

	const getCurrentTab = () => {
		switch (tab) {
			case TAB.TICK:
				return <Ticks key={tab} previousClose={previousClose} />;
			case TAB.DAY:
				return <Days key={tab} stockCode={stockCode} />;
			default:
				return <Ticks key={tab} previousClose={previousClose} />;
		}
	};

	return (
		<div className="trading-logs-container">
			<div className="trading-logs-title">
				<button
					type="button"
					className={`trading-logs-tab ${tab === TAB.TICK ? 'trading-logs-tab-clicked' : ''}`}
					onClick={() => setTab(TAB.TICK)}
				>
					체결
				</button>
				<button
					type="button"
					className={`trading-logs-tab ${tab === TAB.DAY ? 'trading-logs-tab-clicked' : ''}`}
					onClick={() => setTab(TAB.DAY)}
				>
					일별
				</button>
			</div>
			{getCurrentTab()}
		</div>
	);
};

export default TradingLogs;
