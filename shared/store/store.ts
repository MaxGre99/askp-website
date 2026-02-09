import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { uploadApi } from '../api/uploadApi';
import { userApi } from '../api/userApi';

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[uploadApi.reducerPath]: uploadApi.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(authApi.middleware)
				.concat(userApi.middleware)
				.concat(uploadApi.middleware),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
