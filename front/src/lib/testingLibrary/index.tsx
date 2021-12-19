import { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Socket from '@src/Socket';

function RecoilWrapper({ children }: { children: ReactElement }) {
	return (
		<RecoilRoot>
			<Socket>{children}</Socket>
		</RecoilRoot>
	);
}

function renderWithRecoil(ui: ReactElement, options?: RenderOptions) {
	render(ui, { wrapper: RecoilRoot, ...options });
}

function renderWithRecoilAndSocket(ui: ReactElement, options?: RenderOptions) {
	render(ui, { wrapper: RecoilWrapper, ...options });
}

export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { userEvent, renderWithRecoil, renderWithRecoilAndSocket };
