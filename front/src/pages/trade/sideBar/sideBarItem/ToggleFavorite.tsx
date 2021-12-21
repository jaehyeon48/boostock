import React from 'react';
import TOAST from '@lib/toastify';
import { AiFillStar } from 'react-icons/ai';
import { toggleFavorite } from '@lib/api';

interface IProps {
	isFavorite: boolean;
	isLoggedIn: boolean;
	stockCode: string;
	nameKorean: string;
	onRefresh: (isLoggedIn: boolean) => void;
}

const ToggleFavorite = ({ isFavorite, isLoggedIn, stockCode, nameKorean, onRefresh }: IProps) => {
	const handleToggleFavorite = async () => {
		if (!isLoggedIn) {
			TOAST.error('로그인이 필요합니다');
			return;
		}

		const isToggleSucceeded = await toggleFavorite(stockCode, isFavorite);

		if (isToggleSucceeded) {
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
			return;
		}

		TOAST.error('관심 종목 설정에 실패했습니다. 다시 시도해 주세요!');
	};

	return (
		<button
			type="button"
			className="sidebar__item-favorite"
			onClick={handleToggleFavorite}
			aria-label="toggle-favorite"
		>
			<AiFillStar color={isFavorite ? '#FFA800' : '#999'} aria-label="favorite-icon" />
		</button>
	);
};

export default ToggleFavorite;
