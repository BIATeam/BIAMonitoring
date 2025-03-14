import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableLazyLoadEvent } from 'primeng/table';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { CrudItemSignalRService } from 'src/app/shared/bia-shared/feature-templates/crud-items/services/crud-item-signalr.service';
import { CrudItemService } from 'src/app/shared/bia-shared/feature-templates/crud-items/services/crud-item.service';
import { TeamTypeId } from 'src/app/shared/constants';
import { AppState } from 'src/app/store/state';
import { DbEngineType } from '../model/db-engine-type';
import { dbEngineTypeCRUDConfiguration } from '../db-engine-type.constants';
import { FeatureDbEngineTypesStore } from '../store/db-engine-type.state';
import { FeatureDbEngineTypesActions } from '../store/db-engine-types-actions';
import { DbEngineTypeDas } from './db-engine-type-das.service';
import { DbEngineTypeOptionsService } from './db-engine-type-options.service';

@Injectable({
  providedIn: 'root',
})
export class DbEngineTypeService extends CrudItemService<DbEngineType> {
  constructor(
    private store: Store<AppState>,
    public dasService: DbEngineTypeDas,
    public signalRService: CrudItemSignalRService<DbEngineType>,
    public optionsService: DbEngineTypeOptionsService,
    // required only for parent key
    protected authService: AuthService
  ) {
    super(dasService, signalRService, optionsService);
  }

  public getParentIds(): any[] {
    // TODO after creation of CRUD DbEngineType : adapt the parent Key tothe context. It can be null if root crud
    return [this.authService.getCurrentTeamId(TeamTypeId.Site)];
  }

  public getFeatureName() {
    return dbEngineTypeCRUDConfiguration.featureName;
  }

  public crudItems$: Observable<DbEngineType[]> = this.store.select(
    FeatureDbEngineTypesStore.getAllDbEngineTypes
  );
  public totalCount$: Observable<number> = this.store.select(
    FeatureDbEngineTypesStore.getDbEngineTypesTotalCount
  );
  public loadingGetAll$: Observable<boolean> = this.store.select(
    FeatureDbEngineTypesStore.getDbEngineTypeLoadingGetAll
  );
  public lastLazyLoadEvent$: Observable<TableLazyLoadEvent> = this.store.select(
    FeatureDbEngineTypesStore.getLastLazyLoadEvent
  );

  public crudItem$: Observable<DbEngineType> = this.store.select(
    FeatureDbEngineTypesStore.getCurrentDbEngineType
  );

  public displayItemName$: Observable<string> = this.crudItem$.pipe(
    map(dbEngineType => dbEngineType?.name?.toString() ?? '')
  );

  public loadingGet$: Observable<boolean> = this.store.select(
    FeatureDbEngineTypesStore.getDbEngineTypeLoadingGet
  );

  public load(id: any) {
    this.store.dispatch(FeatureDbEngineTypesActions.load({ id }));
  }
  public loadAllByPost(event: TableLazyLoadEvent) {
    this.store.dispatch(FeatureDbEngineTypesActions.loadAllByPost({ event }));
  }
  public create(crudItem: DbEngineType) {
    // TODO after creation of CRUD DbEngineType : map parent Key on the corresponding field
    this.store.dispatch(FeatureDbEngineTypesActions.create({ dbEngineType: crudItem }));
  }
  public update(crudItem: DbEngineType) {
    this.store.dispatch(FeatureDbEngineTypesActions.update({ dbEngineType: crudItem }));
  }
  public save(crudItems: DbEngineType[]) {
    this.store.dispatch(FeatureDbEngineTypesActions.save({ dbEngineTypes: crudItems }));
  }
  public remove(id: any) {
    this.store.dispatch(FeatureDbEngineTypesActions.remove({ id }));
  }
  public multiRemove(ids: any[]) {
    this.store.dispatch(FeatureDbEngineTypesActions.multiRemove({ ids }));
  }
  public clearAll() {
    this.store.dispatch(FeatureDbEngineTypesActions.clearAll());
  }
  public clearCurrent() {
    this._currentCrudItem = <DbEngineType>{};
    this._currentCrudItemId = 0;
    this.store.dispatch(FeatureDbEngineTypesActions.clearCurrent());
  }
}
