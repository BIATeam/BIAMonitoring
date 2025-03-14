import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  CrudState,
  DEFAULT_CRUD_STATE,
} from 'src/app/shared/bia-shared/model/crud-state';
import { HangfireVersion } from '../model/hangfire-version';
import { FeatureHangfireVersionsActions } from './hangfire-versions-actions';

// This adapter will allow is to manipulate hangfireVersions (mostly CRUD operations)
export const hangfireVersionsAdapter = createEntityAdapter<HangfireVersion>({
  selectId: (hangfireVersion: HangfireVersion) => hangfireVersion.id,
  sortComparer: false,
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<HangfireVersion> {
//   ids: string[] | number[];
//   entities: { [id: string]: HangfireVersion };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects

export interface State extends CrudState<HangfireVersion>, EntityState<HangfireVersion> {
  // additional props here
}

export const INIT_STATE: State = hangfireVersionsAdapter.getInitialState({
  ...DEFAULT_CRUD_STATE(),
  // additional props default values here
});

export const hangfireVersionReducers = createReducer<State>(
  INIT_STATE,
  on(FeatureHangfireVersionsActions.clearAll, state => {
    const stateUpdated = hangfireVersionsAdapter.removeAll(state);
    stateUpdated.totalCount = 0;
    return stateUpdated;
  }),
  on(FeatureHangfireVersionsActions.clearCurrent, state => {
    return { ...state, currentItem: <HangfireVersion>{} };
  }),
  on(FeatureHangfireVersionsActions.loadAllByPost, state => {
    return { ...state, loadingGetAll: true };
  }),
  on(FeatureHangfireVersionsActions.load, state => {
    return { ...state, loadingGet: true };
  }),
  on(FeatureHangfireVersionsActions.save, state => {
    return { ...state, loadingGetAll: true };
  }),
  on(FeatureHangfireVersionsActions.loadAllByPostSuccess, (state, { result, event }) => {
    const stateUpdated = hangfireVersionsAdapter.setAll(result.data, state);
    stateUpdated.totalCount = result.totalCount;
    stateUpdated.lastLazyLoadEvent = event;
    stateUpdated.loadingGetAll = false;
    return stateUpdated;
  }),
  on(FeatureHangfireVersionsActions.loadSuccess, (state, { hangfireVersion }) => {
    return { ...state, currentItem: hangfireVersion, loadingGet: false };
  }),
  on(FeatureHangfireVersionsActions.failure, state => {
    return { ...state, loadingGetAll: false, loadingGet: false };
  })
);

export const getHangfireVersionById = (id: number) => (state: State) =>
  state.entities[id];
