import { apply, put } from 'redux-saga/effects';

import { Api, ApiError } from '@template/api';

import {
    ResourceFetchAction,
    createResourceFetchFailAction,
    createResourceFetchSuccessAction,
} from './createResourceReducer';
import { Resource, ResourceFetchDataType } from './types';

export const createResourceFetchSaga = <T extends Resource = Resource>(resourceName: T) => {
    function* fetchResource(action: ResourceFetchAction<T>) {
        const api = new Api();
        try {
            const data: ResourceFetchDataType[T] = yield apply(api, api.fetchResource, [
                resourceName,
                action.params,
            ]);
            yield put(createResourceFetchSuccessAction(resourceName, data, action.params));
        } catch (error) {
            const apiError = error as ApiError;
            yield put(createResourceFetchFailAction(resourceName, error as Error, action.params));
            if (apiError.status === 401 || apiError.status === 403) {
                throw new ApiError(apiError.status, apiError.backendError);
            }
        }
    }

    return fetchResource;
};
