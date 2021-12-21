import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IUser, IStockListItem } from '@src/types';
import { userAtom, holdStockListAtom } from '@recoil';
import { getHoldStocks, getFavoriteStocks } from '@lib/api';
import SideBarItem from './sideBarItem/SideBarItem';
import SideBarNav, { MENU } from './sideBarNav/SideBarNav';
import SearchBar from './searchbar/SearchBar';
import getRegExp from './getRegExp';

import './SideBar.scss';

interface IProps {
	stockList: IStockListItem[];
}

const SideBar = ({ stockList }: IProps) => {
	const { isLoggedIn } = useRecoilValue<IUser>(userAtom);
	const [menu, setMenu] = useState(MENU.ALL);
	const [regex, setRegex] = useState(/.*/);
	const [filteredStockListState, setFilteredStockListState] = useState<IStockListItem[]>([]);
	const [favorite, setFavorite] = useState<string[]>([]);
	const [hold, setHold] = useRecoilState<string[]>(holdStockListAtom);

	const searchEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRegex(getRegExp(event?.target?.value));
	};

	const refreshUserStockData = async (isSignedIn: boolean) => {
		if (!isSignedIn) return;

		setFavorite(await getFavoriteStocks());
		setHold((await getHoldStocks()).map((stock: { code: string }) => stock.code));
	};

	useEffect(() => {
		if (!isLoggedIn) {
			setFavorite([]);
			setHold([]);
			return;
		}

		refreshUserStockData(isLoggedIn);
	}, [isLoggedIn]);

	useEffect(() => {
		setFilteredStockListState(() => {
			switch (menu) {
				case MENU.FAVORITE:
					return stockList.filter((stock: IStockListItem) => favorite.includes(stock.code));
				case MENU.HOLD:
					return stockList.filter((stock: IStockListItem) => hold.includes(stock.code));
				default:
					return stockList;
			}
		});
	}, [menu, stockList, favorite, hold]);

	return (
		<div className="sidebar">
			<div className="sidebar__menu">
				{Object.keys(MENU).map((key, index) => (
					<SideBarNav
						key={key}
						setMenu={setMenu}
						index={index}
						className={`sidebar__menu-item ${
							menu === MENU[key as keyof typeof MENU] ? 'selected' : ''
						}`}
					/>
				))}
			</div>
			<SearchBar searchEvent={searchEvent} />
			<div className="sidebar__legend">
				<div className="sidebar__legend-favorite" />
				<div className="sidebar__legend-name">이름</div>
				<div className="sidebar__legend-price">현재가</div>
				<div className="sidebar__legend-percent">전일대비</div>
				<div className="sidebar__legend-amount">거래대금</div>
			</div>
			<div className="sidebar__items">
				{filteredStockListState.length === 0 ? (
					<p className="sidebar__notice-no-items">종목 정보가 없습니다.</p>
				) : (
					filteredStockListState
						.filter(
							(stock: IStockListItem) =>
								regex.test(stock.code.toLowerCase()) ||
								regex.test(stock.nameKorean) ||
								regex.test(stock.nameEnglish.toLowerCase())
						)
						.map((stock: IStockListItem) => (
							<SideBarItem
								key={stock.stockId}
								stock={stock}
								isLoggedIn={isLoggedIn}
								isFavorite={favorite.includes(stock.code)}
								onRefresh={refreshUserStockData}
							/>
						))
				)}
			</div>
		</div>
	);
};

export default SideBar;
