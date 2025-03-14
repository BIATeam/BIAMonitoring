import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { BiaMessageService } from 'src/app/core/bia-core/services/bia-message.service';
import { biaSuccessWaitRefreshSignalR } from 'src/app/core/bia-core/shared/bia-action';
import { DataResult } from 'src/app/shared/bia-shared/model/data-result';
import { AppState } from 'src/app/store/state';
import { DbEngineType } from '../model/db-engine-type';
import { dbEngineTypeCRUDConfiguration } from '../db-engine-type.constants';
import { DbEngineTypeDas } from '../services/db-engine-type-das.service';
import { FeatureDbEngineTypesStore } from './db-engine-type.state';
import { FeatureDbEngineTypesActions } from './db-engine-types-actions';

/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class DbEngineTypesEffects {
  loadAllByPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureDbEngineTypesActions.loadAllByPost),
      map(x => x?.event),
      switchMap(event =>
        this.dbEngineTypeDas.getListByPost({ event: event }).pipe(
          map((result: DataResult<DbEngineType[]>) =>
            FeatureDbEngineTypesActions.loadAllByPostSuccess({
              result: result,
              event: event,
            })
          ),
          catchError(err => {
            this.biaMessageService.showErrorHttpResponse(err);
            return of(FeatureDbEngineTypesActions.failure({ error: err }));
          })
        )
      )
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureDbEngineTypesActions.load),
      map(x => x?.id),
      switchMap(id => {
        return this.dbEngineTypeDas.get({ id: id }).pipe(
          map(dbEngineType => FeatureDbEngineTypesActions.loadSuccess({ dbEngineType })),
          catchError(err => {
            this.biaMessageService.showErrorHttpResponse(err);
            return of(FeatureDbEngineTypesActions.failure({ error: err }));
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureDbEngineTypesActions.create),
      map(x => x?.dbEngineType),
      concatMap(dbEngineType =>
        of(dbEngineType).pipe(
          withLatestFrom(
            this.store.select(FeatureDbEngineTypesStore.getLastLazyLoadEvent)
          )
        )
      ),
      switchMap(([dbEngineType, event]) => {
        return this.dbEngineTypeDas
          .post({
            item: dbEngineType,
            offlineMode: dbEngineTypeCRUDConfiguration.useOfflineMode,
          })
          .pipe(
            map(() => {
              this.biaMessageService.showAddSuccess();
              if (dbEngineTypeCRUDConfiguration.useSignalR) {
                return biaSuccessWaitRefreshSignalR();
              } else {
                return FeatureDbEngineTypesActions.loadAllByPost({
                  event: event,
                });
              }
            }),
            catchError(err => {
              this.biaMessageService.showErrorHttpResponse(err);
              return of(FeatureDbEngineTypesActions.failure({ error: err }));
            })
          );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureDbEngineTypesActions.update),
      map(x => x?.dbEngineType),
      concatMap(dbEngineType =>
        of(dbEngineType).pipe(
          withLatestFrom(
            this.store.select(FeatureDbEngineTypesStore.getLastLazyLoadEvent)
          )
        )
      ),
      switchMap(([dbEngineType, event]) => {
        return this.dbEngineTypeDas
          .put({
            item: dbEngineType,
            id: dbEngineType.id,
            offlineMode: dbEngineTypeCRUDConfiguration.useOfflineMode,
          })
          .pipe(
            map(() => {
              this.biaMessageService.showUpdateSuccess();
              if (dbEngineTypeCRUDConfiguration.useSignalR) {
                return biaSuccessWaitRefreshSignalR();
              } else {
                return FeatureDbEngineTypesActions.loadAllByPost({
                  event: event,
                });
              }
            }),
            catchError(err => {
              this.biaMessageService.showErrorHttpResponse(err);
              return of(FeatureDbEngineTypesActions.failure({ error: err }));
            })
          );
      })
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureDbEngineTypesActions.save),
      map(x => x?.dbEngineTypes),
      concatMap(dbEngineTypes =>
        of(dbEngineTypes).pipe(
          withLatestFrom(
            this.store.select(FeatureDbEngineTypesStore.getLastLazyLoadEvent)
          )
        )
      ),
      switchMap(([dbEngineTypes, event]) => {
        return this.dbEngineTypeDas
          .save({
            items: dbEngineTypes,
            offlineMode: dbEngineTypeCRUDConfiguration.useOfflineMode,
          })
          .pipe(
            map(() => {
              this.biaMessageService.showUpdateSuccess();
              if (dbEngineTypeCRUDConfiguration.useSignalR) {
                return biaSuccessWaitRefreshSignalR();
              } else {
                return FeatureDbEngineTypesActions.loadAllByPost({
                  event: event,
                });
              }
            }),
            catchError(err => {
              this.biaMessageService.showErrorHttpResponse(err);
              return of(FeatureDbEngineTypesActions.failure({ error: err }));
            })
          );
      })
    )
  );

  destroy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureDbEngineTypesActions.remove),
      map(x => x?.id),
      concatMap((id: number) =>
        of(id).pipe(
          withLatestFrom(
            this.store.select(FeatureDbEngineTypesStore.getLastLazyLoadEvent)
          )
        )
      ),
      switchMap(([id, event]) => {
        return this.dbEngineTypeDas
          .delete({
            id: id,
            offlineMode: dbEngineTypeCRUDConfiguration.useOfflineMode,
          })
          .pipe(
            map(() => {
              this.biaMessageService.showDeleteSuccess();
              if (dbEngineTypeCRUDConfiguration.useSignalR) {
                return biaSuccessWaitRefreshSignalR();
              } else {
                return FeatureDbEngineTypesActions.loadAllByPost({
                  event: event,
                });
              }
            }),
            catchError(err => {
              this.biaMessageService.showErrorHttpResponse(err);
              return of(FeatureDbEngineTypesActions.failure({ error: err }));
            })
          );
      })
    )
  );

  multiDestroy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureDbEngineTypesActions.multiRemove),
      map(x => x?.ids),
      concatMap((ids: number[]) =>
        of(ids).pipe(
          withLatestFrom(
            this.store.select(FeatureDbEngineTypesStore.getLastLazyLoadEvent)
          )
        )
      ),
      switchMap(([ids, event]) => {
        return this.dbEngineTypeDas
          .deletes({
            ids: ids,
            offlineMode: dbEngineTypeCRUDConfiguration.useOfflineMode,
          })
          .pipe(
            map(() => {
              this.biaMessageService.showDeleteSuccess();
              if (dbEngineTypeCRUDConfiguration.useSignalR) {
                return biaSuccessWaitRefreshSignalR();
              } else {
                return FeatureDbEngineTypesActions.loadAllByPost({
                  event: event,
                });
              }
            }),
            catchError(err => {
              this.biaMessageService.showErrorHttpResponse(err);
              return of(FeatureDbEngineTypesActions.failure({ error: err }));
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private dbEngineTypeDas: DbEngineTypeDas,
    private biaMessageService: BiaMessageService,
    private store: Store<AppState>
  ) {}
}
