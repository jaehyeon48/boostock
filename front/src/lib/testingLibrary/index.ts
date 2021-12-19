import { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function customRender(ui: ReactElement, options?: RenderOptions) {
	render(ui, { wrapper: RecoilRoot, ...options });
}

export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { userEvent, customRender };
