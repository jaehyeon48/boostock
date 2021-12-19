import { customRender, screen } from '@lib/testingLibrary';
import App from './App';

test('App component test', () => {
	customRender(<App />);

	const loginLink = screen.getByRole('link', { name: '로그인' });
	expect(loginLink).toBeInTheDocument();
});
