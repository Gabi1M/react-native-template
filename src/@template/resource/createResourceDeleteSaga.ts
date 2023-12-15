import { apply, put } from 'redux-saga/effects';

import { Api, ApiError } from '@template/api';

import {
    ResourceDeleteAction,
    createResourceDeleteFailAction,
    createResourceDeleteSuccessAction,
} from './createResourceReducer';
import { Resource, ResourceDeleteDataType } from './types';

export const createResourceDeleteSaga = <T extends Resource = Resource>(resourceName: T) => {
    function* deleteResource(action: ResourceDeleteAction<T>) {
        const api = new Api();
        try {
            const data: ResourceDeleteDataType[T] = yield apply(api, api.deleteResource, [
                resourceName,
                action.params,
            ]);
            yield put(createResourceDeleteSuccessAction(resourceName, data, action.params));
        } catch (error) {
            const apiError = error as ApiError;
            yield put(createResourceDeleteFailAction(resourceName, action.params, error as Error));
            if (apiError.status === 401 || apiError.status === 403) {
                throw new ApiError(apiError.status, apiError.backendError);
            }
        }
    }

    return deleteResource;
};
