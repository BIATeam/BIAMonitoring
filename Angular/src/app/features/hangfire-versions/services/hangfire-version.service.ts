import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableLazyLoadEvent } from 'primeng/table';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { CrudItemSignalRService } from 'src/app/shared/bia-shared/feature-templates/crud-items/services/crud-item-signalr.service';
import { CrudItemService } from 'src/app/shared/bia-shared/feature-templates/crud-items/services/crud-item.service';
import { TeamTypeId } from 'src/app/shared/constants';
import { AppState } from 'src/app/store/state';
import { HangfireVersion } from '../model/hangfire-version';
import { hangfireVersionCRUDConfiguration } from '../hangfire-version.constants';
import { FeatureHangfireVersionsStore } from '../store/hangfire-version.state';
import { FeatureHangfireVersionsActions } from '../store/hangfire-versions-actions';
import { HangfireVersionDas } from './hangfire-version-das.service';
import { HangfireVersionOptionsService } from './hangfire-version-options.service';

@Injectable({
  providedIn: 'root',
})
export class HangfireVersionService extends CrudItemService<HangfireVersion> {
  constructor(
    private store: Store<AppState>,
    public dasService: HangfireVersionDas,
    public signalRService: CrudItemSignalRService<HangfireVersion>,
    public optionsService: HangfireVersionOptionsService,
    // required only for parent key
    protected authService: AuthService
  ) {
    super(dasService, signalRService, optionsService);
  }

  public getParentIds(): any[] {
    // TODO after creation of CRUD HangfireVersion : adapt the parent Key tothe context. It can be null if root crud
    return [this.authService.getCurrentTeamId(TeamTypeId.Site)];
  }

  public getFeatureName() {
    return hangfireVersionCRUDConfiguration.featureName;
  }

  public crudItems$: Observable<HangfireVersion[]> = this.store.select(
    FeatureHangfireVersionsStore.getAllHangfireVersions
  );
  public totalCount$: Observable<number> = this.store.select(
    FeatureHangfireVersionsStore.getHangfireVersionsTotalCount
  );
  public loadingGetAll$: Observable<boolean> = this.store.select(
    FeatureHangfireVersionsStore.getHangfireVersionLoadingGetAll
  );
  public lastLazyLoadEvent$: Observable<TableLazyLoadEvent> = this.store.select(
    FeatureHangfireVersionsStore.getLastLazyLoadEvent
  );

  public crudItem$: Observable<HangfireVersion> = this.store.select(
    FeatureHangfireVersionsStore.getCurrentHangfireVersion
  );

  public displayItemName$: Observable<string> = this.crudItem$.pipe(
    map(hangfireVersion => hangfireVersion?.version?.toString() ?? '')
  );

  public loadingGet$: Observable<boolean> = this.store.select(
    FeatureHangfireVersionsStore.getHangfireVersionLoadingGet
  );

  public load(id: any) {
    this.store.dispatch(FeatureHangfireVersionsActions.load({ id }));
  }
  public loadAllByPost(event: TableLazyLoadEvent) {
    this.store.dispatch(FeatureHangfireVersionsActions.loadAllByPost({ event }));
  }
  public create(crudItem: HangfireVersion) {
    // TODO after creation of CRUD HangfireVersion : map parent Key on the corresponding field
    this.store.dispatch(FeatureHangfireVersionsActions.create({ hangfireVersion: crudItem }));
  }
  public update(crudItem: HangfireVersion) {
    this.store.dispatch(FeatureHangfireVersionsActions.update({ hangfireVersion: crudItem }));
  }
  public save(crudItems: HangfireVersion[]) {
    this.store.dispatch(FeatureHangfireVersionsActions.save({ hangfireVersions: crudItems }));
  }
  public remove(id: any) {
    this.store.dispatch(FeatureHangfireVersionsActions.remove({ id }));
  }
  public multiRemove(ids: any[]) {
    this.store.dispatch(FeatureHangfireVersionsActions.multiRemove({ ids }));
  }
  public clearAll() {
    this.store.dispatch(FeatureHangfireVersionsActions.clearAll());
  }
  public clearCurrent() {
    this._currentCrudItem = <HangfireVersion>{};
    this._currentCrudItemId = 0;
    this.store.dispatch(FeatureHangfireVersionsActions.clearCurrent());
  }
}
