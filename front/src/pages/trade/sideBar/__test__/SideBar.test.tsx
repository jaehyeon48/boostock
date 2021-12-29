import { renderWithRecoil, screen } from '@lib/testingLibrary';
import SideBar from '../SideBar';

test('Check whether SideBar view is rendered correctly', async () => {
	renderWithRecoil(<SideBar />);

	const numOfStocks = 4;
	const favoriteIcons = await screen.findAllByLabelText('favorite-icon');
	expect(favoriteIcons).toHaveLength(numOfStocks);

	const searchInput = await screen.findByPlaceholderText('What stocks are you looking for');
	expect(searchInput).toBeInTheDocument();

	// to prevent "not wrapped in act(...)" error
	await screen.findAllByLabelText('favorite-icon');
});
