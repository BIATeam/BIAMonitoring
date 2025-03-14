import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ReducerManager, StoreModule } from '@ngrx/store';
import { PermissionGuard } from 'src/app/core/bia-core/guards/permission.guard';
import { FullPageLayoutComponent } from 'src/app/shared/bia-shared/components/layout/fullpage-layout/fullpage-layout.component';
import { PopupLayoutComponent } from 'src/app/shared/bia-shared/components/layout/popup-layout/popup-layout.component';
import { Permission } from 'src/app/shared/permission';
import { SharedModule } from 'src/app/shared/shared.module';
import { HangfireVersionFormComponent } from './components/hangfire-version-form/hangfire-version-form.component';
import { HangfireVersionItemComponent } from './views/hangfire-version-item/hangfire-version-item.component';
import { HangfireVersionsIndexComponent } from './views/hangfire-versions-index/hangfire-versions-index.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CrudItemImportModule } from 'src/app/shared/bia-shared/feature-templates/crud-items/crud-item-import.module';
import { CrudItemModule } from 'src/app/shared/bia-shared/feature-templates/crud-items/crud-item.module';
import { HangfireVersionTableComponent } from './components/hangfire-version-table/hangfire-version-table.component';
import { hangfireVersionCRUDConfiguration } from './hangfire-version.constants';
import { FeatureHangfireVersionsStore } from './store/hangfire-version.state';
import { HangfireVersionsEffects } from './store/hangfire-versions-effects';
import { HangfireVersionEditComponent } from './views/hangfire-version-edit/hangfire-version-edit.component';
import { HangfireVersionImportComponent } from './views/hangfire-version-import/hangfire-version-import.component';
import { HangfireVersionNewComponent } from './views/hangfire-version-new/hangfire-version-new.component';

export const ROUTES: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null,
      permission: Permission.HangfireVersion_List_Access,
      injectComponent: HangfireVersionsIndexComponent,
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
          permission: Permission.HangfireVersion_Create,
          title: 'hangfireVersion.add',
          injectComponent: HangfireVersionNewComponent,
          dynamicComponent: () =>
            hangfireVersionCRUDConfiguration.usePopup
              ? PopupLayoutComponent
              : FullPageLayoutComponent,
        },
        component: hangfireVersionCRUDConfiguration.usePopup
          ? PopupLayoutComponent
          : FullPageLayoutComponent,
        canActivate: [PermissionGuard],
      },
      {
        path: 'import',
        data: {
          breadcrumb: 'hangfire-version.import',
          canNavigate: false,
          style: {
            minWidth: '80vw',
            maxWidth: '80vw',
            maxHeight: '80vh',
          },
          permission: Permission.HangfireVersion_Save,
          title: 'hangfireVersion.import',
          injectComponent: HangfireVersionImportComponent,
          dynamicComponent: () =>
            hangfireVersionCRUDConfiguration.usePopup
              ? PopupLayoutComponent
              : FullPageLayoutComponent,
        },
        component: hangfireVersionCRUDConfiguration.usePopup
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
        component: HangfireVersionItemComponent,
        canActivate: [PermissionGuard],
        children: [
          {
            path: 'edit',
            data: {
              breadcrumb: 'bia.edit',
              canNavigate: true,
              permission: Permission.HangfireVersion_Update,
              title: 'hangfireVersion.edit',
              injectComponent: HangfireVersionEditComponent,
              dynamicComponent: () =>
                hangfireVersionCRUDConfiguration.usePopup
                  ? PopupLayoutComponent
                  : FullPageLayoutComponent,
            },
            component: hangfireVersionCRUDConfiguration.usePopup
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
    HangfireVersionItemComponent,
    HangfireVersionsIndexComponent,
    // [Calc] : NOT used for calc (3 lines).
    // it is possible to delete unsed commponent files (views/..-new + views/..-edit + components/...-form).
    HangfireVersionFormComponent,
    HangfireVersionNewComponent,
    HangfireVersionEditComponent,
    // [Calc] : Used only for calc it is possible to delete unsed commponent files (components/...-table)).
    HangfireVersionTableComponent,
    HangfireVersionImportComponent,
  ],
  imports: [
    SharedModule,
    CrudItemModule,
    CrudItemImportModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature(
      hangfireVersionCRUDConfiguration.storeKey,
      FeatureHangfireVersionsStore.reducers
    ),
    EffectsModule.forFeature([HangfireVersionsEffects]),
    // TODO after creation of CRUD HangfireVersion : select the optioDto dommain module required for link
    // Domain Modules:
  ],
})
export class HangfireVersionModule {}
