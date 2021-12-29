import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import { server } from '@mocks';

beforeAll(() => {
	server.listen();
	process.env.SERVER_URL = 'http://localhost:3000';
	Element.prototype.scrollTo = () => {};
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
