/* eslint-disable-next-line no-restricted-imports */
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

import { GlobalState } from './types';

export const storeRef: {
    store: ToolkitStore<GlobalState> | undefined;
} = { store: undefined };
