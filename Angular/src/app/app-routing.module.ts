import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HOME_ROUTES } from './features/home/home.module';
import { LayoutComponent } from './shared/bia-shared/components/layout/layout.component';
import { PageLayoutComponent } from './shared/bia-shared/components/layout/page-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      ...HOME_ROUTES,
      {
        path: '',
        component: PageLayoutComponent,
        children: [
          /// BIAToolKit - Begin Routing
          /// BIAToolKit - Begin Partial Routing DbEngineType
          {
            path: 'db-engine-types',
            data: {
              breadcrumb: 'app.db-engine-types',
              canNavigate: true,
            },
            loadChildren: () =>
              import('./features/db-engine-types/db-engine-type.module').then(
                m => m.DbEngineTypeModule
              ),
          },
          /// BIAToolKit - End Partial Routing DbEngineType
          /// BIAToolKit - Begin Partial Routing HangfireVersion
          {
            path: 'hangfire-versions',
            data: {
              breadcrumb: 'app.hangfire-versions',
              canNavigate: true,
            },
            loadChildren: () =>
              import(
                './features/hangfire-versions/hangfire-version.module'
              ).then(m => m.HangfireVersionModule),
          },
          /// BIAToolKit - End Partial Routing HangfireVersion
          /// BIAToolKit - End Routing
          {
            path: 'sites',
            data: {
              breadcrumb: 'app.sites',
              canNavigate: true,
            },
            loadChildren: () =>
              import('./features/sites/site.module').then(m => m.SiteModule),
          },
          {
            path: 'users',
            data: {
              breadcrumb: 'app.users',
              canNavigate: true,
            },
            loadChildren: () =>
              import('./features/bia-features/users/user.module').then(
                m => m.UserModule
              ),
          },
          {
            path: 'notifications',
            data: {
              breadcrumb: 'app.notifications',
              canNavigate: true,
            },
            loadChildren: () =>
              import(
                './features/bia-features/notifications/notification.module'
              ).then(m => m.NotificationModule),
          },
          {
            path: 'backgroundtask',
            data: {
              breadcrumb: 'bia.backgroundtasks',
              canNavigate: true,
            },
            loadChildren: () =>
              import(
                './features/bia-features/background-task/background-task.module'
              ).then(m => m.BackgroundTaskModule),
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
