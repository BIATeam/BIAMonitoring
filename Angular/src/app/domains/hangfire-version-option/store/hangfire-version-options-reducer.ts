import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { OptionDto } from 'src/app/shared/bia-shared/model/option-dto';
import { DomainHangfireVersionOptionsActions } from './hangfire-version-options-actions';

// This adapter will allow is to manipulate hangfireVersions (mostly CRUD operations)
export const hangfireVersionOptionsAdapter = createEntityAdapter<OptionDto>({
  selectId: (hangfireVersion: OptionDto) => hangfireVersion.id,
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

export type State = EntityState<OptionDto>;

export const INIT_STATE: State = hangfireVersionOptionsAdapter.getInitialState({
  // additional props default values here
});

export const hangfireVersionOptionReducers = createReducer<State>(
  INIT_STATE,
  on(DomainHangfireVersionOptionsActions.loadAllSuccess, (state, { hangfireVersions }) =>
    hangfireVersionOptionsAdapter.setAll(hangfireVersions, state)
  )
  // on(loadSuccess, (state, { hangfireVersion }) => hangfireVersionOptionsAdapter.upsertOne(hangfireVersion, state))
);

export const getHangfireVersionOptionById = (id: number) => (state: State) =>
  state.entities[id];
