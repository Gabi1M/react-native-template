import { Resource, createResourceReducer } from '@template/resource';

const { reducer, actions } = createResourceReducer(Resource.DUMMY);

export { reducer as dummyReducer, actions as DummyActions };
