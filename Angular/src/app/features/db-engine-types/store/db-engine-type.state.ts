import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { DbEngineType } from '../model/db-engine-type';
import { dbEngineTypeCRUDConfiguration } from '../db-engine-type.constants';
import * as fromDbEngineTypes from './db-engine-types-reducer';

export namespace FeatureDbEngineTypesStore {
  export interface DbEngineTypesState {
    dbEngineTypes: fromDbEngineTypes.State;
  }

  /** Provide reducers with AoT-compilation compliance */
  export function reducers(state: DbEngineTypesState | undefined, action: Action) {
    return combineReducers({
      dbEngineTypes: fromDbEngineTypes.dbEngineTypeReducers,
    })(state, action);
  }

  /**
   * The createFeatureSelector function selects a piece of state from the root of the state object.
   * This is used for selecting feature states that are loaded eagerly or lazily.
   */

  export const getDbEngineTypesState = createFeatureSelector<DbEngineTypesState>(
    dbEngineTypeCRUDConfiguration.storeKey
  );

  export const getDbEngineTypesEntitiesState = createSelector(
    getDbEngineTypesState,
    state => state.dbEngineTypes
  );

  export const getDbEngineTypesTotalCount = createSelector(
    getDbEngineTypesEntitiesState,
    state => state.totalCount
  );

  export const getCurrentDbEngineType = createSelector(
    getDbEngineTypesEntitiesState,
    state => state.currentItem ?? <DbEngineType>{}
  );

  export const getLastLazyLoadEvent = createSelector(
    getDbEngineTypesEntitiesState,
    state => state.lastLazyLoadEvent
  );

  export const getDbEngineTypeLoadingGet = createSelector(
    getDbEngineTypesEntitiesState,
    state => state.loadingGet
  );

  export const getDbEngineTypeLoadingGetAll = createSelector(
    getDbEngineTypesEntitiesState,
    state => state.loadingGetAll
  );

  export const { selectAll: getAllDbEngineTypes } =
    fromDbEngineTypes.dbEngineTypesAdapter.getSelectors(getDbEngineTypesEntitiesState);

  export const getDbEngineTypeById = (id: number) =>
    createSelector(getDbEngineTypesEntitiesState, fromDbEngineTypes.getDbEngineTypeById(id));
}
