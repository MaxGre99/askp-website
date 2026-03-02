import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { baseApi } from '@/shared/api';

const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});
// };

export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof /* setupStore */ store.dispatch>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
