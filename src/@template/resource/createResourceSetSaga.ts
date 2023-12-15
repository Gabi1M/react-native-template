import { apply, put } from 'redux-saga/effects';

import { Api, ApiError } from '@template/api';

import {
    ResourceSetAction,
    createResourceSetFailAction,
    createResourceSetSuccessAction,
} from './createResourceReducer';
import { Resource, ResourceSetDataType } from './types';

export const createResourceSetSaga = <T extends Resource = Resource>(resourceName: T) => {
    function* setResource(action: ResourceSetAction<T>) {
        const api = new Api();
        try {
            const data: ResourceSetDataType[T] = yield apply(api, api.setResource, [
                resourceName,
                action.params,
            ]);
            yield put(createResourceSetSuccessAction(resourceName, data, action.params));
        } catch (error) {
            const apiError = error as ApiError;
            yield put(createResourceSetFailAction(resourceName, action.params, error as Error));
            if (apiError.status === 401 || apiError.status === 403) {
                throw new ApiError(apiError.status, apiError.backendError);
            }
        }
    }

    return setResource;
};
