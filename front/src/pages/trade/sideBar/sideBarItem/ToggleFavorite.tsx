import React from 'react';
import axios from 'axios';
import TOAST from '@lib/toastify';
import { AiFillStar } from 'react-icons/ai';

interface IProps {
	isFavorite: boolean;
	isLoggedIn: boolean;
	stockCode: string;
	nameKorean: string;
	onRefresh: (isLoggedIn: boolean) => void;
}

const ToggleFavorite = ({ isFavorite, isLoggedIn, stockCode, nameKorean, onRefresh }: IProps) => {
	const toggleFavorite = async () => {
		if (!isLoggedIn) {
			TOAST.error('로그인이 필요합니다');
			return;
		}

		const config = {
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			withCredentials: true
		};

		const reqBody = JSON.stringify({ stockCode, shouldDeleteFavorite: isFavorite });

		try {
			const res = await axios.post(`${process.env.SERVER_URL}/api/user/favorite`, reqBody, config);
			if (res.status >= 400) throw new Error();

			const toastMessage = isFavorite
				? ` 종목이 관심 종목에서 제거되었습니다.`
				: ` 종목이 관심 종목으로 등록되었습니다.`;

			TOAST.success(
				<span>
					<b>{nameKorean}</b>
					{toastMessage}
				</span>
			);
			onRefresh(isLoggedIn);
		} catch (error) {
			TOAST.error('관심 종목 설정에 실패했습니다. 다시 시도해 주세요!');
		}
	};

	return (
		<button
			type="button"
			className="sidebar__item-favorite"
			onClick={toggleFavorite}
			aria-label="toggle-favorite"
		>
			<AiFillStar color={isFavorite ? '#FFA800' : '#999'} aria-label="favorite-icon" />
		</button>
	);
};

export default ToggleFavorite;
