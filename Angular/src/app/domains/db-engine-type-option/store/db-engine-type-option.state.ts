import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { storeKey } from '../db-engine-type-option.contants';
import * as fromDbEngineTypeOptions from './db-engine-type-options-reducer';

export interface DbEngineTypeOptionsState {
  dbEngineTypeOptions: fromDbEngineTypeOptions.State;
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(
  state: DbEngineTypeOptionsState | undefined,
  action: Action
) {
  return combineReducers({
    dbEngineTypeOptions: fromDbEngineTypeOptions.dbEngineTypeOptionReducers,
  })(state, action);
}

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

export const getDbEngingeTypesState =
  createFeatureSelector<DbEngineTypeOptionsState>(storeKey);

export const getDbEngineTypeOptionsEntitiesState = createSelector(
  getDbEngingeTypesState,
  state => state.dbEngineTypeOptions
);

export const { selectAll: getAllDbEngineTypeOptions } =
  fromDbEngineTypeOptions.dbEngineTypeOptionsAdapter.getSelectors(
    getDbEngineTypeOptionsEntitiesState
  );

export const getDbEngineTypeOptionById = (id: number) =>
  createSelector(
    getDbEngineTypeOptionsEntitiesState,
    fromDbEngineTypeOptions.getDbEngineTypeOptionById(id)
  );
