import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { avatarsApi } from '../shared/api';
import { newsApi } from '@/entities/news';
import { eventsApi } from '@/entities/events';
import { applicationsApi } from '@/entities/applications';
import { authApi, userApi } from '@/entities/users';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[avatarsApi.reducerPath]: avatarsApi.reducer,
	[newsApi.reducerPath]: newsApi.reducer,
	[eventsApi.reducerPath]: eventsApi.reducer,
	[applicationsApi.reducerPath]: applicationsApi.reducer,
});

export const /* setupStore = () => {
	return */ store = configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(authApi.middleware)
				.concat(userApi.middleware)
				.concat(avatarsApi.middleware)
				.concat(newsApi.middleware)
				.concat(eventsApi.middleware)
				.concat(applicationsApi.middleware),
	});
// };

export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof /* setupStore */ store.dispatch>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
