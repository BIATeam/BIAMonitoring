import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { OptionDto } from 'src/app/shared/bia-shared/model/option-dto';
import { DomainDbEngineTypeOptionsActions } from './db-engine-type-options-actions';

// This adapter will allow is to manipulate dbEngingeTypes (mostly CRUD operations)
export const dbEngineTypeOptionsAdapter = createEntityAdapter<OptionDto>({
  selectId: (dbEngineType: OptionDto) => dbEngineType.id,
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

export type State = EntityState<OptionDto>;

export const INIT_STATE: State = dbEngineTypeOptionsAdapter.getInitialState({
  // additional props default values here
});

export const dbEngineTypeOptionReducers = createReducer<State>(
  INIT_STATE,
  on(DomainDbEngineTypeOptionsActions.loadAllSuccess, (state, { dbEngingeTypes }) =>
    dbEngineTypeOptionsAdapter.setAll(dbEngingeTypes, state)
  )
  // on(loadSuccess, (state, { dbEngineType }) => dbEngineTypeOptionsAdapter.upsertOne(dbEngineType, state))
);

export const getDbEngineTypeOptionById = (id: number) => (state: State) =>
  state.entities[id];
