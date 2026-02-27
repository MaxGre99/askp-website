import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

type Props = {
	store: Store;
	children: React.ReactNode;
};

export const StoreProvider = ({ store, children }: Props) => (
	<Provider store={store}>{children}</Provider>
);
