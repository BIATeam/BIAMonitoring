import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { storeKey } from '../hangfire-version-option.contants';
import * as fromHangfireVersionOptions from './hangfire-version-options-reducer';

export interface HangfireVersionOptionsState {
  hangfireVersionOptions: fromHangfireVersionOptions.State;
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(
  state: HangfireVersionOptionsState | undefined,
  action: Action
) {
  return combineReducers({
    hangfireVersionOptions: fromHangfireVersionOptions.hangfireVersionOptionReducers,
  })(state, action);
}

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

export const getHangfireVersionsState =
  createFeatureSelector<HangfireVersionOptionsState>(storeKey);

export const getHangfireVersionOptionsEntitiesState = createSelector(
  getHangfireVersionsState,
  state => state.hangfireVersionOptions
);

export const { selectAll: getAllHangfireVersionOptions } =
  fromHangfireVersionOptions.hangfireVersionOptionsAdapter.getSelectors(
    getHangfireVersionOptionsEntitiesState
  );

export const getHangfireVersionOptionById = (id: number) =>
  createSelector(
    getHangfireVersionOptionsEntitiesState,
    fromHangfireVersionOptions.getHangfireVersionOptionById(id)
  );
