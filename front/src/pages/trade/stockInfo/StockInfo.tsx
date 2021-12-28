import React, { useEffect } from 'react';
import { IStockListItem } from '@src/types';
import { formatNumber, truncateNumber, truncateUnit, caretIcon } from '@common/utils';

import './StockInfo.scss';

interface IProps {
	info: IStockListItem;
}

function priceColorClass(percent: number): string {
	if (percent < 0) return 'price-minus';
	if (percent > 0) return 'price-plus';
	return 'price-neutral';
}

const StockInfo = ({ info }: IProps) => {
	const { nameKorean, price, previousClose, charts } = info;
	const {
		priceLow = 0,
		priceHigh = 0,
		volume = 0,
		amount = 0
	} = charts.filter(({ type }) => type === 1440)[0] ?? [];

	const percent = ((price - previousClose) / previousClose) * 100;

	useEffect(() => {
		document.title = `boostock/${nameKorean}`;

		return () => {
			document.title = 'boostock';
		};
	}, [nameKorean]);

	return (
		<div className="stock-info">
			<div className="stock-info__left">
				<header className="stock-name" aria-label="stock-name">
					{nameKorean}
				</header>
				<div className={`current-price-info ${priceColorClass(percent)}`}>
					<div className="current-price ">₩{formatNumber(price)}</div>
					<div className="price-percent">
						{caretIcon(percent)}
						{percent.toFixed(2)}%
					</div>
				</div>
			</div>
			<div className="stock-info__right">
				<div className="extra-info high-price">
					<span className="extra-info-data" aria-label="high-price">
						{formatNumber(priceHigh)}원
					</span>
					<span className="extra-info-text">고가</span>
				</div>
				<div className="extra-info trading-volume">
					<span className="extra-info-data" aria-label="amount-data">
						{formatNumber(truncateNumber(amount))}
						{truncateUnit(amount, '주')}
					</span>
					<span className="extra-info-text">거래량</span>
				</div>
				<div className="extra-info low-price">
					<span className="extra-info-data" aria-label="low-price">
						{formatNumber(priceLow)}원
					</span>
					<span className="extra-info-text">저가</span>
				</div>
				<div className="extra-info trading-amount">
					<span className="extra-info-data" aria-label="volume-data">
						{formatNumber(truncateNumber(volume))}
						{truncateUnit(volume, '원')}
					</span>
					<span className="extra-info-text">거래대금</span>
				</div>
			</div>
		</div>
	);
};

export default StockInfo;
