import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BiaMessageService } from 'src/app/core/bia-core/services/bia-message.service';
import { BiaOnlineOfflineService } from 'src/app/core/bia-core/services/bia-online-offline.service';
import { DbEngineTypeOptionDas } from '../services/db-engine-type-option-das.service';
import { DomainDbEngineTypeOptionsActions } from './db-engine-type-options-actions';
/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class DbEngineTypeOptionsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        DomainDbEngineTypeOptionsActions.loadAll
      ) /* When action is dispatched */,
      /* startWith(loadAll()), */
      /* Hit the DbEngingeTypes Index endpoint of our REST API */
      /* Dispatch LoadAllSuccess action to the central store with id list returned by the backend as id*/
      /* 'DbEngingeTypes Reducers' will take care of the rest */
      switchMap(() =>
        this.dbEngineTypeDas
          .getList({
            endpoint: 'allOptions',
            offlineMode: BiaOnlineOfflineService.isModeEnabled,
          })
          .pipe(
            map(dbEngingeTypes =>
              DomainDbEngineTypeOptionsActions.loadAllSuccess({
                dbEngingeTypes: dbEngingeTypes?.sort((a, b) =>
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
              return of(DomainDbEngineTypeOptionsActions.failure({ error: err }));
            })
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dbEngineTypeDas: DbEngineTypeOptionDas,
    private biaMessageService: BiaMessageService
  ) {}
}
