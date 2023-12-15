import { apply, put } from 'redux-saga/effects';

import { Api, ApiError } from '@template/api';

import {
    ResourceUpdateAction,
    createResourceUpdateFailAction,
    createResourceUpdateSuccessAction,
} from './createResourceReducer';
import { Resource, ResourceUpdateDataType } from './types';

export const createResourceUpdateSaga = <T extends Resource = Resource>(resourceName: T) => {
    function* updateResource(action: ResourceUpdateAction<T>) {
        const api = new Api();
        try {
            const data: ResourceUpdateDataType[T] = yield apply(api, api.updateResource, [
                resourceName,
                action.params,
            ]);
            yield put(createResourceUpdateSuccessAction(resourceName, data, action.params));
        } catch (error) {
            const apiError = error as ApiError;
            yield put(createResourceUpdateFailAction(resourceName, action.params, error as Error));
            if (apiError.status === 401 || apiError.status === 403) {
                throw new ApiError(apiError.status, apiError.backendError);
            }
        }
    }

    return updateResource;
};
