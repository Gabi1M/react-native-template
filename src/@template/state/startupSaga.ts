import SplashScreen from 'react-native-splash-screen';

import { apply, delay } from 'redux-saga/effects';

export function* startupSaga() {
    yield delay(1000);

    yield apply(SplashScreen, SplashScreen.hide, []);
}
