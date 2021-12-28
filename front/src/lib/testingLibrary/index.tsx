import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function RecoilWrapper({ children }: { children: ReactElement }) {
	return (
		<RecoilRoot>
			<BrowserRouter>{children}</BrowserRouter>
		</RecoilRoot>
	);
}

function renderWithRecoil(ui: ReactElement, options?: RenderOptions): RenderResult {
	return render(ui, { wrapper: RecoilWrapper, ...options });
}

export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { userEvent, renderWithRecoil };
