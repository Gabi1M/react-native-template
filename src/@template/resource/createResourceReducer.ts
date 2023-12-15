import {
    BaseAction,
    Resource,
    ResourceDeleteDataType,
    ResourceDeleteParams,
    ResourceFetchDataType,
    ResourceFetchParams,
    ResourceSetDataType,
    ResourceSetParams,
    ResourceUpdateDataType,
    ResourceUpdateParams,
} from './types';

type ActionsType =
    | 'FETCH'
    | 'FETCH_SUCCESS'
    | 'FETCH_FAIL'
    | 'FETCH_SET_LOADING'
    | 'POST'
    | 'POST_SUCCESS'
    | 'POST_FAIL'
    | 'POST_SET_LOADING'
    | 'UPDATE'
    | 'UPDATE_SUCCESS'
    | 'UPDATE_FAIL'
    | 'UPDATE_SET_LOADING'
    | 'DELETE'
    | 'DELETE_SUCCESS'
    | 'DELETE_FAIL'
    | 'DELETE_SET_LOADING'
    | 'CLEAR';

export type Actions = { [key in ActionsType]: string };

// #region State
export type ResourceFetchState<T extends Resource = Resource> = {
    data?: ResourceFetchDataType[T];
    params?: ResourceFetchParams[T];
    error?: Error;
    isLoading: boolean;
};

export type ResourceSetState<T extends Resource = Resource> = {
    data?: ResourceSetDataType[T];
    params?: ResourceSetParams[T];
    error?: Error;
    isLoading: boolean;
};

export type ResourceUpdateState<T extends Resource = Resource> = {
    data?: ResourceUpdateDataType[T];
    params?: ResourceUpdateParams[T];
    error?: Error;
    isLoading: boolean;
};

export type ResourceDeleteState<T extends Resource = Resource> = {
    data?: ResourceDeleteDataType[T];
    params?: ResourceDeleteParams[T];
    error?: Error;
    isLoading: boolean;
};

export type ResourceState<T extends Resource = Resource> = {
    fetch: ResourceFetchState<T>;
    set: ResourceSetState<T>;
    update: ResourceUpdateState<T>;
    delete: ResourceDeleteState<T>;
};

export type ResourceReducer<T extends Resource = Resource> = (
    state: ResourceState<T> | undefined,
    action: ResourceAction<T>,
) => ResourceState<T>;

export type CreatedResourceReducer<T extends Resource = Resource> = {
    reducer: ResourceReducer<T>;
    actions: Actions;
};
// #endregion

//#region Clear action

export type ResourceClearAction = BaseAction;

export const createResourceClearAction = (resourceName: Resource): ResourceClearAction => ({
    type: `${resourceName.toUpperCase()}/CLEAR`,
});

//#endregion

export type ResourceSetLoadingAction = BaseAction & {
    loading: boolean;
};

// #region Fetch action
export type ResourceFetchAction<T extends Resource = Resource> = BaseAction & {
    params?: ResourceFetchParams[T];
};

export type ResourceFetchSuccessAction<T extends Resource = Resource> = ResourceFetchAction<T> & {
    data: ResourceFetchDataType[T];
};

export type ResourceFetchFailAction<T extends Resource = Resource> = ResourceFetchAction<T> & {
    error: Error;
};

export type ResourceFetchSetLoadingAction = ResourceSetLoadingAction;
// #endregion

// #region Set action
export type ResourceSetAction<T extends Resource = Resource> = BaseAction & {
    params: ResourceSetParams[T];
};

export type ResourceSetSuccessAction<T extends Resource = Resource> = ResourceSetAction<T> & {
    data: ResourceSetDataType[T];
};

export type ResourceSetFailAction<T extends Resource = Resource> = ResourceSetAction<T> & {
    error: Error;
};

export type ResourceSetSetLoadingAction = ResourceSetLoadingAction;
// #endregion

//#region Update action
export type ResourceUpdateAction<T extends Resource = Resource> = BaseAction & {
    params: ResourceUpdateParams[T];
};

export type ResourceUpdateSuccessAction<T extends Resource = Resource> = ResourceUpdateAction<T> & {
    data: ResourceUpdateDataType[T];
};

export type ResourceUpdateFailAction<T extends Resource = Resource> = ResourceUpdateAction<T> & {
    error: Error;
};

export type ResourceUpdateSetLoadingAction = ResourceSetLoadingAction;
// #endregion

// #region Delete action
export type ResourceDeleteAction<T extends Resource = Resource> = BaseAction & {
    params: ResourceDeleteParams[T];
};

export type ResourceDeleteSuccessAction<T extends Resource = Resource> = ResourceDeleteAction<T> & {
    data: ResourceDeleteDataType[T];
};

export type ResourceDeleteFailAction<T extends Resource = Resource> = ResourceDeleteAction<T> & {
    error: Error;
};

export type ResourceDeleteSetLoadingAction = ResourceSetLoadingAction;
// #endregion

export type ResourceAction<T extends Resource = Resource> =
    | ResourceFetchAction<T>
    | ResourceFetchSuccessAction<T>
    | ResourceFetchFailAction<T>
    | ResourceFetchSetLoadingAction
    | ResourceSetAction<T>
    | ResourceSetSuccessAction<T>
    | ResourceSetFailAction<T>
    | ResourceSetSetLoadingAction
    | ResourceUpdateAction<T>
    | ResourceUpdateSuccessAction<T>
    | ResourceUpdateFailAction<T>
    | ResourceUpdateSetLoadingAction
    | ResourceDeleteAction<T>
    | ResourceDeleteSuccessAction<T>
    | ResourceDeleteFailAction<T>
    | ResourceDeleteSetLoadingAction;

export type ResourceSagaArgs<T extends Resource = Resource> = [
    | ResourceFetchAction<T>
    | ResourceSetAction<T>
    | ResourceUpdateAction<T>
    | ResourceDeleteAction<T>,
];

// #region Create fetch action
export const createResourceFetchAction = <T extends Resource = Resource>(
    resourceName: T,
    params?: ResourceFetchParams[T],
): ResourceFetchAction<T> => ({
    type: `${resourceName.toUpperCase()}/FETCH`,
    params,
});

export const createResourceFetchSuccessAction = <T extends Resource = Resource>(
    resourceName: T,
    data: ResourceFetchDataType[T],
    params?: ResourceFetchParams[T],
): ResourceFetchSuccessAction<T> => ({
    type: `${resourceName.toUpperCase()}/FETCH_SUCCESS`,
    params,
    data,
});

export const createResourceFetchFailAction = <T extends Resource = Resource>(
    resourceName: T,
    error: Error,
    params?: ResourceFetchParams[T],
): ResourceFetchFailAction<T> => ({
    type: `${resourceName.toUpperCase()}/FETCH_FAIL`,
    params,
    error,
});

export const createResourceFetchSetLoadingAction = <T extends Resource = Resource>(
    resourceName: T,
    loading: boolean,
): ResourceFetchSetLoadingAction => ({
    type: `${resourceName.toUpperCase()}/FETCH_SET_LOADING`,
    loading,
});
// #endregion

// #region Create set action
export const createResourceSetAction = <T extends Resource = Resource>(
    resourceName: T,
    params: ResourceSetParams[T],
): ResourceSetAction<T> => ({
    type: `${resourceName.toUpperCase()}/POST`,
    params,
});

export const createResourceSetSuccessAction = <T extends Resource = Resource>(
    resourceName: T,
    data: ResourceSetDataType[T],
    params: ResourceSetParams[T],
): ResourceSetSuccessAction<T> => ({
    type: `${resourceName.toUpperCase()}/POST_SUCCESS`,
    data,
    params,
});

export const createResourceSetFailAction = <T extends Resource = Resource>(
    resourceName: T,
    params: ResourceSetParams[T],
    error: Error,
): ResourceSetFailAction<T> => ({
    type: `${resourceName.toUpperCase()}/POST_FAIL`,
    params,
    error,
});

export const createResourceSetSetLoadingAction = <T extends Resource = Resource>(
    resourceName: T,
    loading: boolean,
): ResourceSetSetLoadingAction => ({
    type: `${resourceName.toUpperCase()}/POST_SET_LOADING`,
    loading,
});
// #endregion

// #region Create set action
export const createResourceUpdateAction = <T extends Resource = Resource>(
    resourceName: T,
    params: ResourceUpdateParams[T],
): ResourceUpdateAction<T> => ({
    type: `${resourceName.toUpperCase()}/UPDATE`,
    params,
});

export const createResourceUpdateSuccessAction = <T extends Resource = Resource>(
    resourceName: T,
    data: ResourceUpdateDataType[T],
    params: ResourceUpdateParams[T],
): ResourceUpdateSuccessAction<T> => ({
    type: `${resourceName.toUpperCase()}/UPDATE_SUCCESS`,
    data,
    params,
});

export const createResourceUpdateFailAction = <T extends Resource = Resource>(
    resourceName: T,
    params: ResourceUpdateParams[T],
    error: Error,
): ResourceUpdateFailAction<T> => ({
    type: `${resourceName.toUpperCase()}/UPDATE_FAIL`,
    params,
    error,
});

export const createResourceUpdateSetLoadingAction = <T extends Resource = Resource>(
    resourceName: T,
    loading: boolean,
): ResourceUpdateSetLoadingAction => ({
    type: `${resourceName.toUpperCase()}/UPDATE_SET_LOADING`,
    loading,
});
// #endregion

// #region Create delete action
export const createResourceDeleteAction = <T extends Resource = Resource>(
    resourceName: T,
    params: ResourceDeleteParams[T],
): ResourceDeleteAction<T> => ({
    type: `${resourceName.toUpperCase()}/DELETE`,
    params,
});

export const createResourceDeleteSuccessAction = <T extends Resource = Resource>(
    resourceName: T,
    data: ResourceDeleteDataType[T],
    params: ResourceDeleteParams[T],
): ResourceDeleteSuccessAction<T> => ({
    type: `${resourceName.toUpperCase()}/DELETE_SUCCESS`,
    data,
    params,
});

export const createResourceDeleteFailAction = <T extends Resource = Resource>(
    resourceName: T,
    params: ResourceDeleteParams[T],
    error: Error,
): ResourceDeleteFailAction<T> => ({
    type: `${resourceName.toUpperCase()}/DELETE_FAIL`,
    params,
    error,
});

export const createResourceDeleteSetLoadingAction = <T extends Resource = Resource>(
    resourceName: T,
    loading: boolean,
): ResourceDeleteSetLoadingAction => ({
    type: `${resourceName.toUpperCase()}/DELETE_SET_LOADING`,
    loading,
});
// #endregion

export const createResourceReducer = <T extends Resource = Resource>(
    resource: T,
): CreatedResourceReducer<T> => {
    const reducerName = resource.toUpperCase();
    const actions = Object.freeze({
        FETCH: `${reducerName}/FETCH`,
        FETCH_SUCCESS: `${reducerName}/FETCH_SUCCESS`,
        FETCH_FAIL: `${reducerName}/FETCH_FAIL`,
        FETCH_SET_LOADING: `${reducerName}/FETCH_SET_LOADING`,
        POST: `${reducerName}/POST`,
        POST_SUCCESS: `${reducerName}/POST_SUCCESS`,
        POST_FAIL: `${reducerName}/POST_FAIL`,
        POST_SET_LOADING: `${reducerName}/POST_SET_LOADING`,
        UPDATE: `${reducerName}/UPDATE`,
        UPDATE_SUCCESS: `${reducerName}/UPDATE_SUCCESS`,
        UPDATE_FAIL: `${reducerName}/UPDATE_FAIL`,
        UPDATE_SET_LOADING: `${reducerName}/UPDATE_SET_LOADING`,
        DELETE: `${reducerName}/DELETE`,
        DELETE_SUCCESS: `${reducerName}/DELETE_SUCCESS`,
        DELETE_FAIL: `${reducerName}/DELETE_FAIL`,
        DELETE_SET_LOADING: `${reducerName}/DELETE_SET_LOADING`,
        CLEAR: `${reducerName}/CLEAR`,
    });

    const initialState: ResourceState<T> = {
        fetch: {
            isLoading: false,
        },
        set: {
            isLoading: false,
        },
        update: {
            isLoading: false,
        },
        delete: {
            isLoading: false,
        },
    };

    const reducer = (state: ResourceState<T> = initialState, action: ResourceAction<T>) => {
        switch (action.type) {
            case actions.FETCH: {
                return {
                    ...state,
                    fetch: {
                        ...state.fetch,
                        isLoading: true,
                    },
                };
            }
            case actions.POST: {
                return {
                    ...state,
                    set: {
                        ...state.set,
                        isLoading: true,
                    },
                };
            }
            case actions.UPDATE: {
                return {
                    ...state,
                    update: {
                        ...state.update,
                        isLoading: true,
                    },
                };
            }
            case actions.DELETE: {
                return {
                    ...state,
                    delete: {
                        ...state.delete,
                        isLoading: true,
                    },
                };
            }
            case actions.FETCH_SUCCESS: {
                const fetchSuccessAction = action as ResourceFetchSuccessAction<T>;
                return {
                    ...state,
                    fetch: {
                        ...state.fetch,
                        data: fetchSuccessAction.data,
                        params: fetchSuccessAction.params,
                        error: undefined,
                        isLoading: false,
                    },
                };
            }
            case actions.FETCH_FAIL: {
                const fetchFailAction = action as ResourceFetchFailAction<T>;
                return {
                    ...state,
                    fetch: {
                        ...state.fetch,
                        data: undefined,
                        params: fetchFailAction.params,
                        error: fetchFailAction.error,
                        isLoading: false,
                    },
                };
            }
            case actions.POST_SUCCESS: {
                const postSuccessAction = action as ResourceSetSuccessAction<T>;
                return {
                    ...state,
                    set: {
                        ...state.set,
                        data: postSuccessAction.data,
                        params: postSuccessAction.params,
                        error: undefined,
                        loading: false,
                    },
                };
            }
            case actions.POST_FAIL: {
                const postFailAction = action as ResourceSetFailAction<T>;
                return {
                    ...state,
                    set: {
                        ...state.set,
                        data: undefined,
                        params: postFailAction.params,
                        error: postFailAction.error,
                        loading: false,
                    },
                };
            }
            case actions.UPDATE_SUCCESS: {
                const updateSuccessAction = action as ResourceUpdateSuccessAction<T>;
                return {
                    ...state,
                    update: {
                        ...state.update,
                        data: updateSuccessAction.data,
                        params: updateSuccessAction.params,
                        error: undefined,
                        loading: false,
                    },
                };
            }
            case actions.UPDATE_FAIL: {
                const updateFailAction = action as ResourceUpdateFailAction<T>;
                return {
                    ...state,
                    update: {
                        ...state.update,
                        data: undefined,
                        params: updateFailAction.params,
                        error: updateFailAction.error,
                        loading: false,
                    },
                };
            }
            case actions.DELETE_SUCCESS: {
                const deleteSuccessAction = action as ResourceDeleteSuccessAction<T>;
                return {
                    ...state,
                    delete: {
                        ...state.delete,
                        data: deleteSuccessAction.data,
                        params: deleteSuccessAction.params,
                        error: undefined,
                        isLoading: false,
                    },
                };
            }
            case actions.DELETE_FAIL: {
                const deleteFailAction = action as ResourceDeleteFailAction<T>;
                return {
                    ...state,
                    delete: {
                        ...state.delete,
                        data: undefined,
                        params: deleteFailAction.params,
                        error: deleteFailAction.error,
                        isLoading: false,
                    },
                };
            }
            case actions.FETCH_SET_LOADING: {
                const { loading } = action as ResourceFetchSetLoadingAction;
                return {
                    ...state,
                    fetch: {
                        ...state.fetch,
                        isLoading: loading,
                    },
                };
            }
            case actions.POST_SET_LOADING: {
                const { loading } = action as ResourceSetSetLoadingAction;
                return {
                    ...state,
                    set: {
                        ...state.set,
                        isLoading: loading,
                    },
                };
            }
            case actions.UPDATE_SET_LOADING: {
                const { loading } = action as ResourceUpdateSetLoadingAction;
                return {
                    ...state,
                    update: {
                        ...state.update,
                        isLoading: loading,
                    },
                };
            }
            case actions.DELETE_SET_LOADING: {
                const { loading } = action as ResourceDeleteSetLoadingAction;
                return {
                    ...state,
                    delete: {
                        ...state.delete,
                        isLoading: loading,
                    },
                };
            }
            case actions.CLEAR: {
                return initialState;
            }
            default: {
                return state;
            }
        }
    };

    return {
        reducer,
        actions,
    };
};
