import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  CrudState,
  DEFAULT_CRUD_STATE,
} from 'src/app/shared/bia-shared/model/crud-state';
import { DbEngineType } from '../model/db-engine-type';
import { FeatureDbEngineTypesActions } from './db-engine-types-actions';

// This adapter will allow is to manipulate dbEngineTypes (mostly CRUD operations)
export const dbEngineTypesAdapter = createEntityAdapter<DbEngineType>({
  selectId: (dbEngineType: DbEngineType) => dbEngineType.id,
  sortComparer: false,
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<DbEngineType> {
//   ids: string[] | number[];
//   entities: { [id: string]: DbEngineType };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects

export interface State extends CrudState<DbEngineType>, EntityState<DbEngineType> {
  // additional props here
}

export const INIT_STATE: State = dbEngineTypesAdapter.getInitialState({
  ...DEFAULT_CRUD_STATE(),
  // additional props default values here
});

export const dbEngineTypeReducers = createReducer<State>(
  INIT_STATE,
  on(FeatureDbEngineTypesActions.clearAll, state => {
    const stateUpdated = dbEngineTypesAdapter.removeAll(state);
    stateUpdated.totalCount = 0;
    return stateUpdated;
  }),
  on(FeatureDbEngineTypesActions.clearCurrent, state => {
    return { ...state, currentItem: <DbEngineType>{} };
  }),
  on(FeatureDbEngineTypesActions.loadAllByPost, state => {
    return { ...state, loadingGetAll: true };
  }),
  on(FeatureDbEngineTypesActions.load, state => {
    return { ...state, loadingGet: true };
  }),
  on(FeatureDbEngineTypesActions.save, state => {
    return { ...state, loadingGetAll: true };
  }),
  on(FeatureDbEngineTypesActions.loadAllByPostSuccess, (state, { result, event }) => {
    const stateUpdated = dbEngineTypesAdapter.setAll(result.data, state);
    stateUpdated.totalCount = result.totalCount;
    stateUpdated.lastLazyLoadEvent = event;
    stateUpdated.loadingGetAll = false;
    return stateUpdated;
  }),
  on(FeatureDbEngineTypesActions.loadSuccess, (state, { dbEngineType }) => {
    return { ...state, currentItem: dbEngineType, loadingGet: false };
  }),
  on(FeatureDbEngineTypesActions.failure, state => {
    return { ...state, loadingGetAll: false, loadingGet: false };
  })
);

export const getDbEngineTypeById = (id: number) => (state: State) =>
  state.entities[id];
