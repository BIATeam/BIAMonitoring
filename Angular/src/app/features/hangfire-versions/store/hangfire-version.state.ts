import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { HangfireVersion } from '../model/hangfire-version';
import { hangfireVersionCRUDConfiguration } from '../hangfire-version.constants';
import * as fromHangfireVersions from './hangfire-versions-reducer';

export namespace FeatureHangfireVersionsStore {
  export interface HangfireVersionsState {
    hangfireVersions: fromHangfireVersions.State;
  }

  /** Provide reducers with AoT-compilation compliance */
  export function reducers(state: HangfireVersionsState | undefined, action: Action) {
    return combineReducers({
      hangfireVersions: fromHangfireVersions.hangfireVersionReducers,
    })(state, action);
  }

  /**
   * The createFeatureSelector function selects a piece of state from the root of the state object.
   * This is used for selecting feature states that are loaded eagerly or lazily.
   */

  export const getHangfireVersionsState = createFeatureSelector<HangfireVersionsState>(
    hangfireVersionCRUDConfiguration.storeKey
  );

  export const getHangfireVersionsEntitiesState = createSelector(
    getHangfireVersionsState,
    state => state.hangfireVersions
  );

  export const getHangfireVersionsTotalCount = createSelector(
    getHangfireVersionsEntitiesState,
    state => state.totalCount
  );

  export const getCurrentHangfireVersion = createSelector(
    getHangfireVersionsEntitiesState,
    state => state.currentItem ?? <HangfireVersion>{}
  );

  export const getLastLazyLoadEvent = createSelector(
    getHangfireVersionsEntitiesState,
    state => state.lastLazyLoadEvent
  );

  export const getHangfireVersionLoadingGet = createSelector(
    getHangfireVersionsEntitiesState,
    state => state.loadingGet
  );

  export const getHangfireVersionLoadingGetAll = createSelector(
    getHangfireVersionsEntitiesState,
    state => state.loadingGetAll
  );

  export const { selectAll: getAllHangfireVersions } =
    fromHangfireVersions.hangfireVersionsAdapter.getSelectors(getHangfireVersionsEntitiesState);

  export const getHangfireVersionById = (id: number) =>
    createSelector(getHangfireVersionsEntitiesState, fromHangfireVersions.getHangfireVersionById(id));
}
