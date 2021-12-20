import { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

export default function RecoilWrapper({ children }: { children: ReactElement }) {
	return (
		<RecoilRoot>
			<BrowserRouter>{children}</BrowserRouter>
		</RecoilRoot>
	);
}
