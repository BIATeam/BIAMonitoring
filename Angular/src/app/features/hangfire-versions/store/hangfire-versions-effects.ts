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
import { HangfireVersion } from '../model/hangfire-version';
import { hangfireVersionCRUDConfiguration } from '../hangfire-version.constants';
import { HangfireVersionDas } from '../services/hangfire-version-das.service';
import { FeatureHangfireVersionsStore } from './hangfire-version.state';
import { FeatureHangfireVersionsActions } from './hangfire-versions-actions';

/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class HangfireVersionsEffects {
  loadAllByPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureHangfireVersionsActions.loadAllByPost),
      map(x => x?.event),
      switchMap(event =>
        this.hangfireVersionDas.getListByPost({ event: event }).pipe(
          map((result: DataResult<HangfireVersion[]>) =>
            FeatureHangfireVersionsActions.loadAllByPostSuccess({
              result: result,
              event: event,
            })
          ),
          catchError(err => {
            this.biaMessageService.showErrorHttpResponse(err);
            return of(FeatureHangfireVersionsActions.failure({ error: err }));
          })
        )
      )
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureHangfireVersionsActions.load),
      map(x => x?.id),
      switchMap(id => {
        return this.hangfireVersionDas.get({ id: id }).pipe(
          map(hangfireVersion => FeatureHangfireVersionsActions.loadSuccess({ hangfireVersion })),
          catchError(err => {
            this.biaMessageService.showErrorHttpResponse(err);
            return of(FeatureHangfireVersionsActions.failure({ error: err }));
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureHangfireVersionsActions.create),
      map(x => x?.hangfireVersion),
      concatMap(hangfireVersion =>
        of(hangfireVersion).pipe(
          withLatestFrom(
            this.store.select(FeatureHangfireVersionsStore.getLastLazyLoadEvent)
          )
        )
      ),
      switchMap(([hangfireVersion, event]) => {
        return this.hangfireVersionDas
          .post({
            item: hangfireVersion,
            offlineMode: hangfireVersionCRUDConfiguration.useOfflineMode,
          })
          .pipe(
            map(() => {
              this.biaMessageService.showAddSuccess();
              if (hangfireVersionCRUDConfiguration.useSignalR) {
                return biaSuccessWaitRefreshSignalR();
              } else {
                return FeatureHangfireVersionsActions.loadAllByPost({
                  event: event,
                });
              }
            }),
            catchError(err => {
              this.biaMessageService.showErrorHttpResponse(err);
              return of(FeatureHangfireVersionsActions.failure({ error: err }));
            })
          );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureHangfireVersionsActions.update),
      map(x => x?.hangfireVersion),
      concatMap(hangfireVersion =>
        of(hangfireVersion).pipe(
          withLatestFrom(
            this.store.select(FeatureHangfireVersionsStore.getLastLazyLoadEvent)
          )
        )
      ),
      switchMap(([hangfireVersion, event]) => {
        return this.hangfireVersionDas
          .put({
            item: hangfireVersion,
            id: hangfireVersion.id,
            offlineMode: hangfireVersionCRUDConfiguration.useOfflineMode,
          })
          .pipe(
            map(() => {
              this.biaMessageService.showUpdateSuccess();
              if (hangfireVersionCRUDConfiguration.useSignalR) {
                return biaSuccessWaitRefreshSignalR();
              } else {
                return FeatureHangfireVersionsActions.loadAllByPost({
                  event: event,
                });
              }
            }),
            catchError(err => {
              this.biaMessageService.showErrorHttpResponse(err);
              return of(FeatureHangfireVersionsActions.failure({ error: err }));
            })
          );
      })
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureHangfireVersionsActions.save),
      map(x => x?.hangfireVersions),
      concatMap(hangfireVersions =>
        of(hangfireVersions).pipe(
          withLatestFrom(
            this.store.select(FeatureHangfireVersionsStore.getLastLazyLoadEvent)
          )
        )
      ),
      switchMap(([hangfireVersions, event]) => {
        return this.hangfireVersionDas
          .save({
            items: hangfireVersions,
            offlineMode: hangfireVersionCRUDConfiguration.useOfflineMode,
          })
          .pipe(
            map(() => {
              this.biaMessageService.showUpdateSuccess();
              if (hangfireVersionCRUDConfiguration.useSignalR) {
                return biaSuccessWaitRefreshSignalR();
              } else {
                return FeatureHangfireVersionsActions.loadAllByPost({
                  event: event,
                });
              }
            }),
            catchError(err => {
              this.biaMessageService.showErrorHttpResponse(err);
              return of(FeatureHangfireVersionsActions.failure({ error: err }));
            })
          );
      })
    )
  );

  destroy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureHangfireVersionsActions.remove),
      map(x => x?.id),
      concatMap((id: number) =>
        of(id).pipe(
          withLatestFrom(
            this.store.select(FeatureHangfireVersionsStore.getLastLazyLoadEvent)
          )
        )
      ),
      switchMap(([id, event]) => {
        return this.hangfireVersionDas
          .delete({
            id: id,
            offlineMode: hangfireVersionCRUDConfiguration.useOfflineMode,
          })
          .pipe(
            map(() => {
              this.biaMessageService.showDeleteSuccess();
              if (hangfireVersionCRUDConfiguration.useSignalR) {
                return biaSuccessWaitRefreshSignalR();
              } else {
                return FeatureHangfireVersionsActions.loadAllByPost({
                  event: event,
                });
              }
            }),
            catchError(err => {
              this.biaMessageService.showErrorHttpResponse(err);
              return of(FeatureHangfireVersionsActions.failure({ error: err }));
            })
          );
      })
    )
  );

  multiDestroy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeatureHangfireVersionsActions.multiRemove),
      map(x => x?.ids),
      concatMap((ids: number[]) =>
        of(ids).pipe(
          withLatestFrom(
            this.store.select(FeatureHangfireVersionsStore.getLastLazyLoadEvent)
          )
        )
      ),
      switchMap(([ids, event]) => {
        return this.hangfireVersionDas
          .deletes({
            ids: ids,
            offlineMode: hangfireVersionCRUDConfiguration.useOfflineMode,
          })
          .pipe(
            map(() => {
              this.biaMessageService.showDeleteSuccess();
              if (hangfireVersionCRUDConfiguration.useSignalR) {
                return biaSuccessWaitRefreshSignalR();
              } else {
                return FeatureHangfireVersionsActions.loadAllByPost({
                  event: event,
                });
              }
            }),
            catchError(err => {
              this.biaMessageService.showErrorHttpResponse(err);
              return of(FeatureHangfireVersionsActions.failure({ error: err }));
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private hangfireVersionDas: HangfireVersionDas,
    private biaMessageService: BiaMessageService,
    private store: Store<AppState>
  ) {}
}
