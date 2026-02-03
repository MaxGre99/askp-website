import { Provider } from 'react-redux';
import { setupStore } from './store';

type Props = {
	children: React.ReactNode;
};

const StoreProvider = ({ children }: Props) => {
	const store = setupStore();

	return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
