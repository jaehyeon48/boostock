/* eslint-disable no-underscore-dangle */
import { useRecoilState } from 'recoil';
import { IDailyLog } from '@src/types';
import { dailyLogAtom } from '@recoil';
import { getDailyLogs } from '@lib/api';

interface Props {
	stockCode: string;
}

const translateTimestampFormat = (timestamp: number): string => {
	const stamp = new Date(timestamp);
	const month = `00${stamp.getMonth() + 1}`.slice(-2);
	const day = `00${stamp.getDate()}`.slice(-2);

	return `${month}.${day}`;
};

const colorPicker = (prev: number, current: number): string => {
	if (prev > current) return 'down';
	if (prev < current) return 'up';
	return '';
};
const getPriceRate = (prev: number, current: number): string => {
	const rate = ((current - prev) / prev) * 100 || 0;
	if (!prev || !Number.isFinite(rate)) return '-';
	return `${rate.toFixed(1)}%`;
};

const Days = ({ stockCode }: Props) => {
	const [dailyLog, setDailyLog] = useRecoilState(dailyLogAtom);

	const fetchDailyLog = async (stockCode: string): Promise<void> => {
		const dailyLogRes = await getDailyLogs(stockCode);
		const { code, logs } = dailyLogRes;

		if (code === stockCode) setDailyLog(logs);
	};

	useEffect(() => {
		fetchDailyLog(stockCode);
	}, [stockCode]);

	return (
		<>
			<header className="trading-logs-header">
				<div className="trading-logs-timestamp">일자</div>
				<div className="trading-logs-single-price">종가(원)</div>
				<div className="trading-logs-total-price">전일대비(%)</div>
				<div className="trading-logs-volume">체결량(주)</div>
			</header>
			<div className="trading-logs-content">
				{dailyLog.length === 0 ? (
					<p className="trading-logs-notice-no-data">일별 정보가 없습니다.</p>
				) : (
					dailyLog.map((log: IDailyLog, index: number) => {
						if (dailyLog.length === 51 && index === dailyLog.length - 1) return <></>;
						const day = translateTimestampFormat(log.createdAt).split(' ');
						const colors = colorPicker(dailyLog[index + 1]?.priceEnd, log.priceEnd);
						return (
							<div className="trading-logs-row" key={log._id} aria-label="trading-logs-list-item">
								<div className="trading-logs-timestamp">
									<span className="timestamp-day">{day}</span>
								</div>
								<div className={`trading-logs-single-price ${colors}`}>
									{log.priceEnd.toLocaleString('ko-kr')}
								</div>
								<div className={`trading-logs-volume ${colors}`}>
									{getPriceRate(dailyLog[index + 1]?.priceEnd, log.priceEnd)}
								</div>
								<div className="trading-logs-total-price">{log.amount.toLocaleString('ko-kr')}</div>
							</div>
						);
					})
				)}
			</div>
		</>
	);
};

export default Days;
