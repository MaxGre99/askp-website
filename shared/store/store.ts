import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { avatarsApi } from '../api/avatarsApi';
import { userApi } from '../api/userApi';
import { newsApi } from '../api/newsApi';
import { eventsApi } from '../api/eventsApi';
import { applicationsApi } from '../api/applicationsApi';

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[avatarsApi.reducerPath]: avatarsApi.reducer,
	[newsApi.reducerPath]: newsApi.reducer,
	[eventsApi.reducerPath]: eventsApi.reducer,
	[applicationsApi.reducerPath]: applicationsApi.reducer,
});

export const setupStore = () => {
	return configureStore({
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
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
