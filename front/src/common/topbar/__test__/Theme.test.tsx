import { renderWithRecoil, screen, userEvent } from '@lib/testingLibrary';
import Theme from '@src/Theme';
import TopBar from '../TopBar';

test('Switch theme from light to dark', () => {
	renderWithRecoil(
		<Theme>
			<TopBar pages={[]} />
		</Theme>
	);

	const themeContainer = screen.getByRole('main');
	expect(themeContainer).not.toHaveClass('dark-theme');

	const themeSwitchBtn = screen.getByRole('switch');
	userEvent.click(themeSwitchBtn);
	expect(themeContainer).toHaveClass('dark-theme');
});
