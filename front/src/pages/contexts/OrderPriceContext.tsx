import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

const OrderPriceContext = createContext<number | null>(null);
const UpdateOrderPriceContext = createContext<Dispatch<SetStateAction<number>> | null>(null);

export function OrderPriceContextProvider({ children }: { children: ReactNode }) {
	const [orderPrice, setOrderPrice] = useState(0);

	return (
		<OrderPriceContext.Provider value={orderPrice}>
			<UpdateOrderPriceContext.Provider value={setOrderPrice}>
				{children}
			</UpdateOrderPriceContext.Provider>
		</OrderPriceContext.Provider>
	);
}

export function useOrderPrice() {
	const state = useContext(OrderPriceContext);
	if (state === null) throw new Error('useOrderPrice must be used within a OrderPriceProvider');

	return state;
}

export function useUpdateOrderPrice() {
	const state = useContext(UpdateOrderPriceContext);
	if (state === null) {
		throw new Error('useUpdateOrderPrice must be used within a UpdateOrderPriceProvider');
	}

	return state;
}
