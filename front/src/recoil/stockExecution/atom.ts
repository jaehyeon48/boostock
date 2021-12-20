import { atom } from 'recoil';
import { IStockExecutionInfo } from '@src/types';

const stockExecutionAtom = atom<IStockExecutionInfo>({
	key: 'stockExecutionAtom',
	default: {
		stockCode: 'HNX',
		executions: [
			{
				timestamp: 1639981262834,
				price: 3206,
				volume: 3206,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020ce87b682c62d70a988'
			},
			{
				timestamp: 1639981262788,
				price: 3208,
				volume: 3208,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020ce87b682c62d70a986'
			},
			{
				timestamp: 1639981258693,
				price: 3203,
				volume: 12812,
				amount: 4,
				stockCode: 'HNX',
				id: '61c020ca87b682c62d70a974'
			},
			{
				timestamp: 1639981257980,
				price: 3194,
				volume: 3194,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020c987b682c62d70a96c'
			},
			{
				timestamp: 1639981257946,
				price: 3195,
				volume: 3195,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020c987b682c62d70a96a'
			},
			{
				timestamp: 1639981254432,
				price: 3197,
				volume: 9591,
				amount: 3,
				stockCode: 'HNX',
				id: '61c020c687b682c62d70a952'
			},
			{
				timestamp: 1639981254401,
				price: 3198,
				volume: 3198,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020c687b682c62d70a950'
			},
			{
				timestamp: 1639981251414,
				price: 3191,
				volume: 3191,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020c387b682c62d70a946'
			},
			{
				timestamp: 1639981251376,
				price: 3193,
				volume: 9579,
				amount: 3,
				stockCode: 'HNX',
				id: '61c020c387b682c62d70a944'
			},
			{
				timestamp: 1639981245734,
				price: 3186,
				volume: 6372,
				amount: 2,
				stockCode: 'HNX',
				id: '61c020bd87b682c62d70a934'
			},
			{
				timestamp: 1639981241496,
				price: 3180,
				volume: 6360,
				amount: 2,
				stockCode: 'HNX',
				id: '61c020b987b682c62d70a916'
			},
			{
				timestamp: 1639981241454,
				price: 3184,
				volume: 6368,
				amount: 2,
				stockCode: 'HNX',
				id: '61c020b987b682c62d70a914'
			},
			{
				timestamp: 1639981241341,
				price: 3184,
				volume: 3184,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020b987b682c62d70a912'
			},
			{
				timestamp: 1639981241305,
				price: 3185,
				volume: 9555,
				amount: 3,
				stockCode: 'HNX',
				id: '61c020b987b682c62d70a90e'
			},
			{
				timestamp: 1639981238269,
				price: 3180,
				volume: 3180,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020b687b682c62d70a8f0'
			},
			{
				timestamp: 1639981238237,
				price: 3183,
				volume: 9549,
				amount: 3,
				stockCode: 'HNX',
				id: '61c020b687b682c62d70a8ee'
			},
			{
				timestamp: 1639981234851,
				price: 3172,
				volume: 3172,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020b287b682c62d70a8e4'
			},
			{
				timestamp: 1639981234814,
				price: 3175,
				volume: 3175,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020b287b682c62d70a8e2'
			},
			{
				timestamp: 1639981232850,
				price: 3175,
				volume: 6350,
				amount: 2,
				stockCode: 'HNX',
				id: '61c020b087b682c62d70a8dc'
			},
			{
				timestamp: 1639981232291,
				price: 3176,
				volume: 3176,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020b087b682c62d70a8d8'
			},
			{
				timestamp: 1639981232245,
				price: 3181,
				volume: 9543,
				amount: 3,
				stockCode: 'HNX',
				id: '61c020b087b682c62d70a8d6'
			},
			{
				timestamp: 1639981230210,
				price: 3172,
				volume: 3172,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020ae87b682c62d70a8d0'
			},
			{
				timestamp: 1639981230176,
				price: 3174,
				volume: 3174,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020ae87b682c62d70a8ce'
			},
			{
				timestamp: 1639981222448,
				price: 3167,
				volume: 6334,
				amount: 2,
				stockCode: 'HNX',
				id: '61c020a687b682c62d70a8a4'
			},
			{
				timestamp: 1639981222413,
				price: 3167,
				volume: 3167,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020a687b682c62d70a8a2'
			},
			{
				timestamp: 1639981221441,
				price: 3174,
				volume: 3174,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020a587b682c62d70a8a0'
			},
			{
				timestamp: 1639981221393,
				price: 3164,
				volume: 9492,
				amount: 3,
				stockCode: 'HNX',
				id: '61c020a587b682c62d70a89e'
			},
			{
				timestamp: 1639981220818,
				price: 3165,
				volume: 3165,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020a487b682c62d70a89c'
			},
			{
				timestamp: 1639981220677,
				price: 3169,
				volume: 3169,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020a487b682c62d70a89a'
			},
			{
				timestamp: 1639981219628,
				price: 3169,
				volume: 3169,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020a387b682c62d70a890'
			},
			{
				timestamp: 1639981219568,
				price: 3166,
				volume: 6332,
				amount: 2,
				stockCode: 'HNX',
				id: '61c020a387b682c62d70a88e'
			},
			{
				timestamp: 1639981219377,
				price: 3166,
				volume: 3166,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020a387b682c62d70a88a'
			},
			{
				timestamp: 1639981216877,
				price: 3170,
				volume: 3170,
				amount: 1,
				stockCode: 'HNX',
				id: '61c020a087b682c62d70a886'
			},
			{
				timestamp: 1639981215821,
				price: 3170,
				volume: 12680,
				amount: 4,
				stockCode: 'HNX',
				id: '61c0209f87b682c62d70a87c'
			},
			{
				timestamp: 1639981214817,
				price: 3160,
				volume: 3160,
				amount: 1,
				stockCode: 'HNX',
				id: '61c0209e87b682c62d70a876'
			},
			{
				timestamp: 1639981214784,
				price: 3164,
				volume: 9492,
				amount: 3,
				stockCode: 'HNX',
				id: '61c0209e87b682c62d70a874'
			},
			{
				timestamp: 1639981213844,
				price: 3164,
				volume: 6328,
				amount: 2,
				stockCode: 'HNX',
				id: '61c0209d87b682c62d70a86a'
			},
			{
				timestamp: 1639981211720,
				price: 3157,
				volume: 9471,
				amount: 3,
				stockCode: 'HNX',
				id: '61c0209b87b682c62d70a860'
			},
			{
				timestamp: 1639981211687,
				price: 3167,
				volume: 3167,
				amount: 1,
				stockCode: 'HNX',
				id: '61c0209b87b682c62d70a85e'
			},
			{
				timestamp: 1639981211112,
				price: 3161,
				volume: 6322,
				amount: 2,
				stockCode: 'HNX',
				id: '61c0209b87b682c62d70a85a'
			},
			{
				timestamp: 1639981211075,
				price: 3158,
				volume: 6316,
				amount: 2,
				stockCode: 'HNX',
				id: '61c0209b87b682c62d70a858'
			},
			{
				timestamp: 1639981206573,
				price: 3166,
				volume: 6332,
				amount: 2,
				stockCode: 'HNX',
				id: '61c0209687b682c62d70a84e'
			},
			{
				timestamp: 1639981206538,
				price: 3166,
				volume: 3166,
				amount: 1,
				stockCode: 'HNX',
				id: '61c0209687b682c62d70a84c'
			},
			{
				timestamp: 1639981206502,
				price: 3170,
				volume: 9510,
				amount: 3,
				stockCode: 'HNX',
				id: '61c0209687b682c62d70a84a'
			},
			{
				timestamp: 1639981204410,
				price: 3164,
				volume: 6328,
				amount: 2,
				stockCode: 'HNX',
				id: '61c0209487b682c62d70a83e'
			},
			{
				timestamp: 1639981202687,
				price: 3160,
				volume: 6320,
				amount: 2,
				stockCode: 'HNX',
				id: '61c0209287b682c62d70a82a'
			},
			{
				timestamp: 1639981202655,
				price: 3158,
				volume: 3158,
				amount: 1,
				stockCode: 'HNX',
				id: '61c0209287b682c62d70a828'
			},
			{
				timestamp: 1639981199812,
				price: 3165,
				volume: 3165,
				amount: 1,
				stockCode: 'HNX',
				id: '61c0208f87b682c62d70a818'
			},
			{
				timestamp: 1639981199622,
				price: 3158,
				volume: 3158,
				amount: 1,
				stockCode: 'HNX',
				id: '61c0208f87b682c62d70a812'
			},
			{
				timestamp: 1639981199584,
				price: 3161,
				volume: 3161,
				amount: 1,
				stockCode: 'HNX',
				id: '61c0208f87b682c62d70a810'
			}
		]
	}
});

export default stockExecutionAtom;
