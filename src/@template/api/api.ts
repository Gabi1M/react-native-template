/* eslint-disable no-restricted-imports */
import CookieManager from '@react-native-cookies/cookies';

import { mockDummy } from '@template/mockData';
import {
    Resource,
    ResourceDeleteParams,
    ResourceFetchParams,
    ResourceSetParams,
    ResourceUpdateParams,
} from '@template/resource/types';

import { ApiError, ContentType, Headers, RequestMethod, getBackendError } from './types';

const isSuccessStatusCode = (code: number) => code >= 200 && code < 400;

const handleResponse = async <T>(response: Response): Promise<T> => {
    const contentType = response.headers.get(Headers.CONTENT_TYPE);
    if (contentType && contentType.indexOf(ContentType.APPLICATION_JSON) !== -1) {
        return (await response.json()) as T;
    }

    return (await response.text()) as unknown as T;
};

/* eslint-disable-next-line @typescript-eslint/naming-convention */
const BASE_URL = `https://google.com`;

export class Api {
    private async get<T>(url: string, params?: URLSearchParams) {
        const finalUrl = params ? `${url}?${params.toString()}` : url;

        const response = await fetch(finalUrl, {
            method: RequestMethod.GET,
        });

        if (!isSuccessStatusCode(response.status)) {
            throw new ApiError(response.status, getBackendError(await response.json()));
        }

        return handleResponse<T>(response);
    }

    private async post<T>(url: string, data: string | FormData, customHeaderType?: string) {
        const contentTypeHeader =
            typeof data === 'string'
                ? { [Headers.CONTENT_TYPE]: customHeaderType ?? ContentType.APPLICATION_JSON }
                : undefined;
        const response = await fetch(url, {
            method: RequestMethod.POST,
            headers: {
                ...contentTypeHeader,
            },
            body: data,
        });

        if (!isSuccessStatusCode(response.status)) {
            throw new ApiError(response.status, getBackendError(await response.json()));
        }

        // this will only be handled by the login request
        const header = response.headers.get('set-cookie');
        if (header) {
            await CookieManager.setFromResponse(BASE_URL, header);
        }

        return handleResponse<T>(response);
    }

    private async update<T>(url: string, data: string | FormData, customHeaderType?: string) {
        const contentTypeHeader =
            typeof data === 'string'
                ? { [Headers.CONTENT_TYPE]: customHeaderType ?? ContentType.APPLICATION_JSON }
                : undefined;
        const response = await fetch(url, {
            method: RequestMethod.PUT,
            headers: {
                ...contentTypeHeader,
            },
            body: data,
        });

        if (!isSuccessStatusCode(response.status)) {
            throw new ApiError(response.status, getBackendError(await response.json()));
        }

        return handleResponse<T>(response);
    }

    private async delete<T>(url: string, params?: URLSearchParams) {
        const finalUrl = params ? `${url}?${params.toString()}` : url;

        const response = await fetch(finalUrl, {
            method: RequestMethod.DELETE,
        });

        if (!isSuccessStatusCode(response.status)) {
            throw new ApiError(response.status, getBackendError(await response.json()));
        }

        return handleResponse<T>(response);
    }

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    async fetchDummy(params: ResourceFetchParams[Resource.DUMMY]) {
        // make api call
        return mockDummy;
    }

    async fetchResource<T extends Resource = Resource>(
        resource: T,
        params?: ResourceFetchParams[T],
    ) {
        switch (resource) {
            case Resource.DUMMY: {
                return this.fetchDummy(params as ResourceFetchParams[Resource.DUMMY]);
            }
            default: {
                return undefined;
            }
        }
    }

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    async setDummy(params: ResourceSetParams[Resource.DUMMY]) {
        // make api call
        return mockDummy;
    }

    async setResource<T extends Resource = Resource>(
        resourceName: T,
        params?: ResourceSetParams[T],
    ) {
        switch (resourceName) {
            case Resource.DUMMY: {
                return this.setDummy(params as ResourceSetParams[Resource.DUMMY]);
            }
            default: {
                return undefined;
            }
        }
    }

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    async updateDummy(params: ResourceUpdateParams[Resource.DUMMY]) {
        // make api call
        return mockDummy;
    }

    async updateResource<T extends Resource = Resource>(
        resourceName: T,
        params?: ResourceUpdateParams[T],
    ) {
        switch (resourceName) {
            case Resource.DUMMY: {
                return this.updateDummy(params as ResourceUpdateParams[Resource.DUMMY]);
            }
            default: {
                return undefined;
            }
        }
    }

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    async deleteDummy(params: ResourceDeleteParams[Resource.DUMMY]) {
        // make api call
        return mockDummy;
    }

    async deleteResource<T extends Resource = Resource>(
        resourceName: T,
        params: ResourceDeleteParams[T],
    ) {
        switch (resourceName) {
            case Resource.DUMMY: {
                return this.deleteDummy(params as ResourceDeleteParams[Resource.DUMMY]);
            }
            default: {
                return undefined;
            }
        }
    }
}
