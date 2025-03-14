import { Component, Injector, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { CrudItemsIndexComponent } from 'src/app/shared/bia-shared/feature-templates/crud-items/views/crud-items-index/crud-items-index.component';
import { Permission } from 'src/app/shared/permission';
import { HangfireVersionTableComponent } from '../../components/hangfire-version-table/hangfire-version-table.component';
import { HangfireVersion } from '../../model/hangfire-version';
import { hangfireVersionCRUDConfiguration } from '../../hangfire-version.constants';
import { HangfireVersionService } from '../../services/hangfire-version.service';

@Component({
  selector: 'app-hangfire-versions-index',
  templateUrl: './hangfire-versions-index.component.html',
  styleUrls: ['./hangfire-versions-index.component.scss'],
})
export class HangfireVersionsIndexComponent extends CrudItemsIndexComponent<HangfireVersion> {
  @ViewChild(HangfireVersionTableComponent, { static: false })
  crudItemTableComponent: HangfireVersionTableComponent;
  // BIAToolKit - Begin PlaneIndexTsCanViewChildDeclaration
  // BIAToolKit - End PlaneIndexTsCanViewChildDeclaration
  constructor(
    protected injector: Injector,
    public hangfireVersionService: HangfireVersionService,
    protected authService: AuthService
  ) {
    super(injector, hangfireVersionService);
    this.crudConfiguration = hangfireVersionCRUDConfiguration;
  }

  protected setPermissions() {
    this.canEdit = this.authService.hasPermission(Permission.HangfireVersion_Update);
    this.canDelete = this.authService.hasPermission(Permission.HangfireVersion_Delete);
    this.canAdd = this.authService.hasPermission(Permission.HangfireVersion_Create);
    this.canSave = this.authService.hasPermission(Permission.HangfireVersion_Save);
    this.canSelect = this.canDelete;
    // BIAToolKit - Begin PlaneIndexTsCanViewChildSet
    // BIAToolKit - End PlaneIndexTsCanViewChildSet
  }
  // BIAToolKit - Begin PlaneIndexTsOnViewChild
  // BIAToolKit - End PlaneIndexTsOnViewChild
}
