import { Component, Injector } from '@angular/core';
import { CrudItemImportComponent } from 'src/app/shared/bia-shared/feature-templates/crud-items/views/crud-item-import/crud-item-import.component';
import { Permission } from 'src/app/shared/permission';
import { HangfireVersion } from '../../model/hangfire-version';
import { hangfireVersionCRUDConfiguration } from '../../hangfire-version.constants';
import { HangfireVersionService } from '../../services/hangfire-version.service';

@Component({
  selector: 'app-hangfire-version-import',
  templateUrl:
    '../../../../shared/bia-shared/feature-templates/crud-items/views/crud-item-import/crud-item-import.component.html',
})
export class HangfireVersionImportComponent extends CrudItemImportComponent<HangfireVersion> {
  constructor(
    protected injector: Injector,
    private hangfireVersionService: HangfireVersionService
  ) {
    super(injector, hangfireVersionService);
    this.crudConfiguration = hangfireVersionCRUDConfiguration;
    this.setPermissions();
  }

  setPermissions() {
    this.canEdit = this.authService.hasPermission(Permission.HangfireVersion_Update);
    this.canDelete = this.authService.hasPermission(Permission.HangfireVersion_Delete);
    this.canAdd = this.authService.hasPermission(Permission.HangfireVersion_Create);
  }

  save(toSaves: HangfireVersion[]): void {
    this.hangfireVersionService.save(toSaves);
  }
}
