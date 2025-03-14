import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ReducerManager, StoreModule } from '@ngrx/store';
import { PermissionGuard } from 'src/app/core/bia-core/guards/permission.guard';
import { FullPageLayoutComponent } from 'src/app/shared/bia-shared/components/layout/fullpage-layout/fullpage-layout.component';
import { PopupLayoutComponent } from 'src/app/shared/bia-shared/components/layout/popup-layout/popup-layout.component';
import { Permission } from 'src/app/shared/permission';
import { SharedModule } from 'src/app/shared/shared.module';
import { DbEngineTypeFormComponent } from './components/db-engine-type-form/db-engine-type-form.component';
import { DbEngineTypeItemComponent } from './views/db-engine-type-item/db-engine-type-item.component';
import { DbEngineTypesIndexComponent } from './views/db-engine-types-index/db-engine-types-index.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CrudItemImportModule } from 'src/app/shared/bia-shared/feature-templates/crud-items/crud-item-import.module';
import { CrudItemModule } from 'src/app/shared/bia-shared/feature-templates/crud-items/crud-item.module';
import { DbEngineTypeTableComponent } from './components/db-engine-type-table/db-engine-type-table.component';
import { dbEngineTypeCRUDConfiguration } from './db-engine-type.constants';
import { FeatureDbEngineTypesStore } from './store/db-engine-type.state';
import { DbEngineTypesEffects } from './store/db-engine-types-effects';
import { DbEngineTypeEditComponent } from './views/db-engine-type-edit/db-engine-type-edit.component';
import { DbEngineTypeImportComponent } from './views/db-engine-type-import/db-engine-type-import.component';
import { DbEngineTypeNewComponent } from './views/db-engine-type-new/db-engine-type-new.component';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null,
      permission: Permission.DbEngineType_List_Access,
      injectComponent: DbEngineTypesIndexComponent,
    },
    component: FullPageLayoutComponent,
    canActivate: [PermissionGuard],
    // [Calc] : The children are not used in calc
    children: [
      {
        path: 'create',
        data: {
          breadcrumb: 'bia.add',
          canNavigate: false,
          permission: Permission.DbEngineType_Create,
          title: 'dbEngineType.add',
          injectComponent: DbEngineTypeNewComponent,
          dynamicComponent: () =>
            dbEngineTypeCRUDConfiguration.usePopup
              ? PopupLayoutComponent
              : FullPageLayoutComponent,
        },
        component: dbEngineTypeCRUDConfiguration.usePopup
          ? PopupLayoutComponent
          : FullPageLayoutComponent,
        canActivate: [PermissionGuard],
      },
      {
        path: 'import',
        data: {
          breadcrumb: 'db-engine-type.import',
          canNavigate: false,
          style: {
            minWidth: '80vw',
            maxWidth: '80vw',
            maxHeight: '80vh',
          },
          permission: Permission.DbEngineType_Save,
          title: 'dbEngineType.import',
          injectComponent: DbEngineTypeImportComponent,
          dynamicComponent: () =>
            dbEngineTypeCRUDConfiguration.usePopup
              ? PopupLayoutComponent
              : FullPageLayoutComponent,
        },
        component: dbEngineTypeCRUDConfiguration.usePopup
          ? PopupLayoutComponent
          : FullPageLayoutComponent,
        canActivate: [PermissionGuard],
      },
      {
        path: ':crudItemId',
        data: {
          breadcrumb: '',
          canNavigate: true,
        },
        component: DbEngineTypeItemComponent,
        canActivate: [PermissionGuard],
        children: [
          {
            path: 'edit',
            data: {
              breadcrumb: 'bia.edit',
              canNavigate: true,
              permission: Permission.DbEngineType_Update,
              title: 'dbEngineType.edit',
              injectComponent: DbEngineTypeEditComponent,
              dynamicComponent: () =>
                dbEngineTypeCRUDConfiguration.usePopup
                  ? PopupLayoutComponent
                  : FullPageLayoutComponent,
            },
            component: dbEngineTypeCRUDConfiguration.usePopup
              ? PopupLayoutComponent
              : FullPageLayoutComponent,
            canActivate: [PermissionGuard],
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'edit',
          },
          // BIAToolKit - Begin PlaneModuleChildPath
          // BIAToolKit - End PlaneModuleChildPath
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    DbEngineTypeItemComponent,
    DbEngineTypesIndexComponent,
    // [Calc] : NOT used for calc (3 lines).
    // it is possible to delete unsed commponent files (views/..-new + views/..-edit + components/...-form).
    DbEngineTypeFormComponent,
    DbEngineTypeNewComponent,
    DbEngineTypeEditComponent,
    // [Calc] : Used only for calc it is possible to delete unsed commponent files (components/...-table)).
    DbEngineTypeTableComponent,
    DbEngineTypeImportComponent,
  ],
  imports: [
    SharedModule,
    CrudItemModule,
    CrudItemImportModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature(
      dbEngineTypeCRUDConfiguration.storeKey,
      FeatureDbEngineTypesStore.reducers
    ),
    EffectsModule.forFeature([DbEngineTypesEffects]),
    // TODO after creation of CRUD DbEngineType : select the optioDto dommain module required for link
    // Domain Modules:
  ],
})
export class DbEngineTypeModule {}
