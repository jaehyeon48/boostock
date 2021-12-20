import { atom } from 'recoil';
import { IUser } from '@src/types';

const userAtom = atom<IUser>({
	key: 'userAtom',
	default: {
		username: '050',
		email: '123@123.123',
		isLoggedIn: true,
		theme: 'light' as const
	}
});
// const userAtom = atom<IUser>({
// 	key: 'userAtom',
// 	default: {
// 		username: '',
// 		email: '',
// 		isLoggedIn: false,
// 		theme: 'light'
// 	}
// });

export default userAtom;
