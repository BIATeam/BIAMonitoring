import { createAction, props } from '@ngrx/store';
import { TableLazyLoadEvent } from 'primeng/table';
import { DataResult } from 'src/app/shared/bia-shared/model/data-result';
import { DbEngineType } from '../model/db-engine-type';
import { dbEngineTypeCRUDConfiguration } from '../db-engine-type.constants';

export namespace FeatureDbEngineTypesActions {
  export const loadAllByPost = createAction(
    '[' + dbEngineTypeCRUDConfiguration.storeKey + '] Load all by post',
    props<{ event: TableLazyLoadEvent }>()
  );

  export const load = createAction(
    '[' + dbEngineTypeCRUDConfiguration.storeKey + '] Load',
    props<{ id: number }>()
  );

  export const create = createAction(
    '[' + dbEngineTypeCRUDConfiguration.storeKey + '] Create',
    props<{ dbEngineType: DbEngineType }>()
  );

  export const update = createAction(
    '[' + dbEngineTypeCRUDConfiguration.storeKey + '] Update',
    props<{ dbEngineType: DbEngineType }>()
  );

  export const save = createAction(
    '[' + dbEngineTypeCRUDConfiguration.storeKey + '] Save',
    props<{ dbEngineTypes: DbEngineType[] }>()
  );

  export const remove = createAction(
    '[' + dbEngineTypeCRUDConfiguration.storeKey + '] Remove',
    props<{ id: number }>()
  );

  export const multiRemove = createAction(
    '[' + dbEngineTypeCRUDConfiguration.storeKey + '] Multi Remove',
    props<{ ids: number[] }>()
  );

  export const loadAllByPostSuccess = createAction(
    '[' + dbEngineTypeCRUDConfiguration.storeKey + '] Load all by post success',
    props<{ result: DataResult<DbEngineType[]>; event: TableLazyLoadEvent }>()
  );

  export const loadSuccess = createAction(
    '[' + dbEngineTypeCRUDConfiguration.storeKey + '] Load success',
    props<{ dbEngineType: DbEngineType }>()
  );

  export const failure = createAction(
    '[' + dbEngineTypeCRUDConfiguration.storeKey + '] Failure',
    props<{ error: any }>()
  );

  export const clearAll = createAction(
    '[' + dbEngineTypeCRUDConfiguration.storeKey + '] Clear all in state'
  );

  export const clearCurrent = createAction(
    '[' + dbEngineTypeCRUDConfiguration.storeKey + '] Clear current'
  );
}
