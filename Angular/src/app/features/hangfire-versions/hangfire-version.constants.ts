import { CrudConfig } from 'src/app/shared/bia-shared/feature-templates/crud-items/model/crud-config';
import { HangfireVersion, hangfireVersionFieldsConfiguration } from './model/hangfire-version';

// TODO after creation of CRUD HangfireVersion : adapt the global configuration
export const hangfireVersionCRUDConfiguration: CrudConfig<HangfireVersion> = new CrudConfig({
  // IMPORTANT: this key should be unique in all the application.
  featureName: 'hangfireVersions',
  fieldsConfig: hangfireVersionFieldsConfiguration,
  useCalcMode: true,
  useSignalR: false,
  useView: true,
  usePopup: true,
  useOfflineMode: false,
  useCompactMode: false,
  useVirtualScroll: false,
  // IMPORTANT: this key should be unique in all the application.
  // storeKey: 'feature-' + featureName,
  // IMPORTANT: this is the key used for the view management it should be unique in all the application (except if share same views).
  // tableStateKey: featureName + 'Grid',
});
