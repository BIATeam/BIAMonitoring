import { Component, Injector } from '@angular/core';
import { CrudItemImportComponent } from 'src/app/shared/bia-shared/feature-templates/crud-items/views/crud-item-import/crud-item-import.component';
import { Permission } from 'src/app/shared/permission';
import { DbEngineType } from '../../model/db-engine-type';
import { dbEngineTypeCRUDConfiguration } from '../../db-engine-type.constants';
import { DbEngineTypeService } from '../../services/db-engine-type.service';

@Component({
  selector: 'app-db-engine-type-import',
  templateUrl:
    '../../../../shared/bia-shared/feature-templates/crud-items/views/crud-item-import/crud-item-import.component.html',
})
export class DbEngineTypeImportComponent extends CrudItemImportComponent<DbEngineType> {
  constructor(
    protected injector: Injector,
    private dbEngineTypeService: DbEngineTypeService
  ) {
    super(injector, dbEngineTypeService);
    this.crudConfiguration = dbEngineTypeCRUDConfiguration;
    this.setPermissions();
  }

  setPermissions() {
    this.canEdit = this.authService.hasPermission(Permission.DbEngineType_Update);
    this.canDelete = this.authService.hasPermission(Permission.DbEngineType_Delete);
    this.canAdd = this.authService.hasPermission(Permission.DbEngineType_Create);
  }

  save(toSaves: DbEngineType[]): void {
    this.dbEngineTypeService.save(toSaves);
  }
}
