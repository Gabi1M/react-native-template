/* eslint-disable no-restricted-imports */
import { ResourceState } from '@template/resource/createResourceReducer';
import { Resource } from '@template/resource/types';

export interface GlobalState {
    [Resource.DUMMY]: ResourceState<Resource.DUMMY>;
}
