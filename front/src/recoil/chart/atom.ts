import { atom } from 'recoil';
import { IChartItem } from '@src/types';

const chartAtom = atom<IChartItem[]>({
	key: 'chatAtom',
	default: [
		{
			createdAt: 1639981351724,
			priceStart: 3206,
			priceEnd: 3206,
			priceLow: 3206,
			priceHigh: 3206,
			amount: 0
		},
		{
			priceStart: 3208,
			priceEnd: 3206,
			priceHigh: 3208,
			priceLow: 3206,
			amount: 2,
			createdAt: 1639981290018
		},
		{
			priceStart: 3158,
			priceEnd: 3203,
			priceHigh: 3203,
			priceLow: 3157,
			amount: 81,
			createdAt: 1639981230012
		},
		{
			priceStart: 3089,
			priceEnd: 3165,
			priceHigh: 3165,
			priceLow: 3088,
			amount: 77,
			createdAt: 1639981170019
		},
		{
			priceStart: 3065,
			priceEnd: 3089,
			priceHigh: 3096,
			priceLow: 3062,
			amount: 90,
			createdAt: 1639981110015
		},
		{
			priceStart: 3029,
			priceEnd: 3058,
			priceHigh: 3069,
			priceLow: 3028,
			amount: 94,
			createdAt: 1639981050013
		},
		{
			priceStart: 3003,
			priceEnd: 3025,
			priceHigh: 3029,
			priceLow: 3003,
			amount: 80,
			createdAt: 1639980990021
		},
		{
			priceStart: 2989,
			priceEnd: 2996,
			priceHigh: 3007,
			priceLow: 2987,
			amount: 52,
			createdAt: 1639980930024
		},
		{
			priceStart: 2989,
			priceEnd: 2989,
			priceHigh: 2989,
			priceLow: 2989,
			amount: 0,
			createdAt: 1639980870031
		}
	]
});
// const chartAtom = atom<IChartItem[]>({
// 	key: 'chatAtom',
// 	default: [
// 		{
// 			createdAt: 0,
// 			priceStart: 0,
// 			priceEnd: 0,
// 			priceLow: 0,
// 			priceHigh: 0,
// 			amount: 0
// 		}
// 	]
// });

export default chartAtom;
