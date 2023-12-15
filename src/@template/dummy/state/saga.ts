import { takeLatest } from 'redux-saga/effects';

import {
    Resource,
    createResourceDeleteSaga,
    createResourceFetchSaga,
    createResourceSetSaga,
    createResourceUpdateSaga,
} from '@template/resource';

import { DummyActions } from './reducer';

export function* dummySaga() {
    yield takeLatest(DummyActions.FETCH, createResourceFetchSaga(Resource.DUMMY));
    yield takeLatest(DummyActions.POST, createResourceSetSaga(Resource.DUMMY));
    yield takeLatest(DummyActions.UPDATE, createResourceUpdateSaga(Resource.DUMMY));
    yield takeLatest(DummyActions.DELETE, createResourceDeleteSaga(Resource.DUMMY));
}
