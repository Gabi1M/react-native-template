import {
    Dummy,
    DummyDeleteParams,
    DummyFetchParams,
    DummySetParams,
    DummyUpdateParams,
} from '@template/models';

export enum Resource {
    DUMMY = 'DUMMY',
}

export type ResourceFetchDataType = {
    [Resource.DUMMY]: Dummy;
};

export type ResourceSetDataType = {
    [Resource.DUMMY]: Dummy;
};

export type ResourceUpdateDataType = {
    [Resource.DUMMY]: Dummy;
};

export type ResourceDeleteDataType = {
    [Resource.DUMMY]: Dummy;
};

export type ResourceFetchParams = {
    [Resource.DUMMY]: DummyFetchParams;
};

export type ResourceSetParams = {
    [Resource.DUMMY]: DummySetParams;
};

export type ResourceUpdateParams = {
    [Resource.DUMMY]: DummyUpdateParams;
};

export type ResourceDeleteParams = {
    [Resource.DUMMY]: DummyDeleteParams;
};

export interface BaseAction {
    type: string;
}
