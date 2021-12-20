import { atom } from 'recoil';
import { IStockListItem } from '@src/types';

const stockListAtom = atom<IStockListItem[]>({
	key: 'stockListAtom',
	default: [
		{
			stockId: 1,
			code: 'HNX',
			nameKorean: '호눅스',
			nameEnglish: 'honux',
			charts: [
				{
					chartId: 1,
					type: 1,
					priceBefore: 2989,
					priceStart: 2989,
					priceEnd: 2989,
					priceHigh: 2989,
					priceLow: 2989,
					amount: 0,
					volume: 0
				},
				{
					chartId: 2,
					type: 1440,
					priceBefore: 1930,
					priceStart: 1935,
					priceEnd: 2989,
					priceHigh: 4290,
					priceLow: 1930,
					amount: 154738,
					volume: 338081146
				}
			],
			price: 2989,
			previousClose: 1930
		},
		{
			stockId: 2,
			code: 'CRG',
			nameKorean: '크롱',
			nameEnglish: 'crong',
			charts: [
				{
					chartId: 3,
					type: 1,
					priceBefore: 7076,
					priceStart: 7076,
					priceEnd: 7076,
					priceHigh: 7076,
					priceLow: 7076,
					amount: 0,
					volume: 0
				},
				{
					chartId: 4,
					type: 1440,
					priceBefore: 1210,
					priceStart: 1213,
					priceEnd: 7076,
					priceHigh: 7322,
					priceLow: 503,
					amount: 166144,
					volume: 491302091
				}
			],
			price: 7076,
			previousClose: 1210
		},
		{
			stockId: 3,
			code: 'JK',
			nameKorean: 'JK',
			nameEnglish: '제이케이',
			charts: [
				{
					chartId: 5,
					type: 1,
					priceBefore: 826,
					priceStart: 826,
					priceEnd: 826,
					priceHigh: 826,
					priceLow: 826,
					amount: 0,
					volume: 0
				},
				{
					chartId: 6,
					type: 1440,
					priceBefore: 424,
					priceStart: 425,
					priceEnd: 826,
					priceHigh: 839,
					priceLow: 398,
					amount: 152773,
					volume: 80351797
				}
			],
			price: 826,
			previousClose: 424
		},
		{
			stockId: 4,
			code: 'IVY',
			nameKorean: 'Ivy',
			nameEnglish: '아이비',
			charts: [
				{
					chartId: 7,
					type: 1,
					priceBefore: 32590000,
					priceStart: 32590000,
					priceEnd: 32590000,
					priceHigh: 32590000,
					priceLow: 32590000,
					amount: 0,
					volume: 0
				},
				{
					chartId: 8,
					type: 1440,
					priceBefore: 5714000,
					priceStart: 5729000,
					priceEnd: 32590000,
					priceHigh: 86890000,
					priceLow: 1,
					amount: 172442,
					volume: 7881377488006
				}
			],
			price: 32590000,
			previousClose: 5714000
		}
	]
});
// const stockListAtom = atom<IStockListItem[]>({
// 	key: 'stockListAtom',
// 	default: []
// });

export default stockListAtom;
