import Reactotron from 'reactotron-react-native';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { dummyReducer, dummySaga } from '@template/dummy';
import { Resource } from '@template/resource';

import { startupSaga } from './startupSaga';
import { GlobalState } from './types';

export const createStore = () => {
    const appSagas = [dummySaga, startupSaga];

    const sagaOptions =
        __DEV__ && Reactotron.createSagaMonitor
            ? { sagaMonitor: Reactotron.createSagaMonitor() }
            : {};
    const enhancers = __DEV__ && Reactotron.createEnhancer ? [Reactotron.createEnhancer()] : [];
    const sagaMiddleware = createSagaMiddleware(sagaOptions);

    const store = configureStore({
        reducer: combineReducers<GlobalState>({
            [Resource.DUMMY]: dummyReducer,
        }),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                immutableCheck: false,
                serializableCheck: false,
            }).concat(sagaMiddleware),
        enhancers,
    });

    appSagas.forEach((saga) => sagaMiddleware.run(saga));

    return store;
};
