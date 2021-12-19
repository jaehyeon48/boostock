import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Socket from '@src/Socket';

function RecoilWrapper({ children }: { children: ReactElement }) {
	return (
		<RecoilRoot>
			<BrowserRouter>{children}</BrowserRouter>
		</RecoilRoot>
	);
}

function SocketWrapper({ children }: { children: ReactElement }) {
	return (
		<RecoilRoot>
			<Socket>
				<BrowserRouter>{children}</BrowserRouter>
			</Socket>
		</RecoilRoot>
	);
}

function renderWithRecoil(ui: ReactElement, options?: RenderOptions) {
	render(ui, { wrapper: RecoilWrapper, ...options });
}

function renderWithRecoilAndSocket(ui: ReactElement, options?: RenderOptions) {
	render(ui, { wrapper: SocketWrapper, ...options });
}

export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { userEvent, renderWithRecoil, renderWithRecoilAndSocket };
