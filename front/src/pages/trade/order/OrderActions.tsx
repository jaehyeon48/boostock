import { useHistory } from 'react-router-dom';
import { GrPowerReset } from 'react-icons/gr';
import { useRecoilValue } from 'recoil';
import { IUser } from '@src/types';
import { userAtom } from '@recoil';

interface IProps {
	orderType: string;
	isAmountError: boolean;
	handleReset: () => void;
	handleOrder: () => void;
}

function orderActionClass(orderType: string): string {
	let result = 'order-action-btn';

	if (orderType === '매수') result += ' bid-action';
	if (orderType === '매도') result += ' ask-action';

	return result;
}

const OrderActions = ({ orderType, isAmountError, handleReset, handleOrder }: IProps) => {
	const history = useHistory();
	const { isLoggedIn } = useRecoilValue<IUser>(userAtom);

	const handleRedirectToSignUpPage = () => {
		history.push('/auth/signup');
	};

	const handleRedirectToSignInPage = () => {
		history.push('/auth/signin');
	};

	const guestContent = (
		<>
			<button
				type="button"
				className="order-reset-btn signup-action"
				onClick={handleRedirectToSignUpPage}
			>
				회원가입
			</button>
			<button
				type="button"
				className="order-action-btn signin-action"
				onClick={handleRedirectToSignInPage}
			>
				로그인
			</button>
		</>
	);

	const authContent = (
		<>
			<button onClick={handleReset} className="order-reset-btn" type="button">
				<span className="order-action-reset-icon">
					<GrPowerReset />
				</span>
				초기화
			</button>
			<button
				className={orderActionClass(orderType)}
				type="button"
				onClick={handleOrder}
				disabled={isAmountError}
				aria-label="order"
			>
				{orderType}
			</button>
		</>
	);

	return <div className="order-action-container">{isLoggedIn ? authContent : guestContent}</div>;
};

export default OrderActions;
