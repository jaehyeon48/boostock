import { rest } from 'msw';

const handlers = [rest.get(`${process.env.SERVER_URL}`, (req, res, ctx) => res())];

export default handlers;
