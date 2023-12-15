/* eslint-disable  no-restricted-imports */
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import Main from '@template/screens/main';
import { createStore } from '@template/state';
import { storeRef } from '@template/state/ref';

if (__DEV__) {
    require('./ReactotronConfig');
}

interface Props {
    isHeadless?: boolean;
}

const App = ({ isHeadless }: Props) => {
    if (isHeadless) {
        return null;
    }

    const store = createStore();
    storeRef.store = store;
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <SafeAreaProvider>
                <Provider store={store}>
                    <Main />
                </Provider>
            </SafeAreaProvider>
        </>
    );
};

export default App;
