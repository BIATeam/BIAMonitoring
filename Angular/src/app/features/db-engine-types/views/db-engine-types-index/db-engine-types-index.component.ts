import { Component, Injector, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { CrudItemsIndexComponent } from 'src/app/shared/bia-shared/feature-templates/crud-items/views/crud-items-index/crud-items-index.component';
import { Permission } from 'src/app/shared/permission';
import { DbEngineTypeTableComponent } from '../../components/db-engine-type-table/db-engine-type-table.component';
import { DbEngineType } from '../../model/db-engine-type';
import { dbEngineTypeCRUDConfiguration } from '../../db-engine-type.constants';
import { DbEngineTypeService } from '../../services/db-engine-type.service';

@Component({
  selector: 'app-db-engine-types-index',
  templateUrl: './db-engine-types-index.component.html',
  styleUrls: ['./db-engine-types-index.component.scss'],
})
export class DbEngineTypesIndexComponent extends CrudItemsIndexComponent<DbEngineType> {
  @ViewChild(DbEngineTypeTableComponent, { static: false })
  crudItemTableComponent: DbEngineTypeTableComponent;
  // BIAToolKit - Begin PlaneIndexTsCanViewChildDeclaration
  // BIAToolKit - End PlaneIndexTsCanViewChildDeclaration
  constructor(
    protected injector: Injector,
    public dbEngineTypeService: DbEngineTypeService,
    protected authService: AuthService
  ) {
    super(injector, dbEngineTypeService);
    this.crudConfiguration = dbEngineTypeCRUDConfiguration;
  }

  protected setPermissions() {
    this.canEdit = this.authService.hasPermission(Permission.DbEngineType_Update);
    this.canDelete = this.authService.hasPermission(Permission.DbEngineType_Delete);
    this.canAdd = this.authService.hasPermission(Permission.DbEngineType_Create);
    this.canSave = this.authService.hasPermission(Permission.DbEngineType_Save);
    this.canSelect = this.canDelete;
    // BIAToolKit - Begin PlaneIndexTsCanViewChildSet
    // BIAToolKit - End PlaneIndexTsCanViewChildSet
  }
  // BIAToolKit - Begin PlaneIndexTsOnViewChild
  // BIAToolKit - End PlaneIndexTsOnViewChild
}
