import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BiaMessageService } from 'src/app/core/bia-core/services/bia-message.service';
import { BiaOnlineOfflineService } from 'src/app/core/bia-core/services/bia-online-offline.service';
import { HangfireVersionOptionDas } from '../services/hangfire-version-option-das.service';
import { DomainHangfireVersionOptionsActions } from './hangfire-version-options-actions';
/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class HangfireVersionOptionsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        DomainHangfireVersionOptionsActions.loadAll
      ) /* When action is dispatched */,
      /* startWith(loadAll()), */
      /* Hit the HangfireVersions Index endpoint of our REST API */
      /* Dispatch LoadAllSuccess action to the central store with id list returned by the backend as id*/
      /* 'HangfireVersions Reducers' will take care of the rest */
      switchMap(() =>
        this.hangfireVersionDas
          .getList({
            endpoint: 'allOptions',
            offlineMode: BiaOnlineOfflineService.isModeEnabled,
          })
          .pipe(
            map(hangfireVersions =>
              DomainHangfireVersionOptionsActions.loadAllSuccess({
                hangfireVersions: hangfireVersions?.sort((a, b) =>
                  a.display.localeCompare(b.display)
                ),
              })
            ),
            catchError(err => {
              if (
                BiaOnlineOfflineService.isModeEnabled !== true ||
                BiaOnlineOfflineService.isServerAvailable(err) === true
              ) {
                this.biaMessageService.showErrorHttpResponse(err);
              }
              return of(DomainHangfireVersionOptionsActions.failure({ error: err }));
            })
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private hangfireVersionDas: HangfireVersionOptionDas,
    private biaMessageService: BiaMessageService
  ) {}
}
