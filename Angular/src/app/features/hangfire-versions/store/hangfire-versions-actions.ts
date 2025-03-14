import { createAction, props } from '@ngrx/store';
import { TableLazyLoadEvent } from 'primeng/table';
import { DataResult } from 'src/app/shared/bia-shared/model/data-result';
import { HangfireVersion } from '../model/hangfire-version';
import { hangfireVersionCRUDConfiguration } from '../hangfire-version.constants';

export namespace FeatureHangfireVersionsActions {
  export const loadAllByPost = createAction(
    '[' + hangfireVersionCRUDConfiguration.storeKey + '] Load all by post',
    props<{ event: TableLazyLoadEvent }>()
  );

  export const load = createAction(
    '[' + hangfireVersionCRUDConfiguration.storeKey + '] Load',
    props<{ id: number }>()
  );

  export const create = createAction(
    '[' + hangfireVersionCRUDConfiguration.storeKey + '] Create',
    props<{ hangfireVersion: HangfireVersion }>()
  );

  export const update = createAction(
    '[' + hangfireVersionCRUDConfiguration.storeKey + '] Update',
    props<{ hangfireVersion: HangfireVersion }>()
  );

  export const save = createAction(
    '[' + hangfireVersionCRUDConfiguration.storeKey + '] Save',
    props<{ hangfireVersions: HangfireVersion[] }>()
  );

  export const remove = createAction(
    '[' + hangfireVersionCRUDConfiguration.storeKey + '] Remove',
    props<{ id: number }>()
  );

  export const multiRemove = createAction(
    '[' + hangfireVersionCRUDConfiguration.storeKey + '] Multi Remove',
    props<{ ids: number[] }>()
  );

  export const loadAllByPostSuccess = createAction(
    '[' + hangfireVersionCRUDConfiguration.storeKey + '] Load all by post success',
    props<{ result: DataResult<HangfireVersion[]>; event: TableLazyLoadEvent }>()
  );

  export const loadSuccess = createAction(
    '[' + hangfireVersionCRUDConfiguration.storeKey + '] Load success',
    props<{ hangfireVersion: HangfireVersion }>()
  );

  export const failure = createAction(
    '[' + hangfireVersionCRUDConfiguration.storeKey + '] Failure',
    props<{ error: any }>()
  );

  export const clearAll = createAction(
    '[' + hangfireVersionCRUDConfiguration.storeKey + '] Clear all in state'
  );

  export const clearCurrent = createAction(
    '[' + hangfireVersionCRUDConfiguration.storeKey + '] Clear current'
  );
}
