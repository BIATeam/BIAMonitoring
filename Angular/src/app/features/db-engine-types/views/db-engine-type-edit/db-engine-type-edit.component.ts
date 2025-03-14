import { Component, Injector } from '@angular/core';
import { CrudItemEditComponent } from 'src/app/shared/bia-shared/feature-templates/crud-items/views/crud-item-edit/crud-item-edit.component';
import { DbEngineType } from '../../model/db-engine-type';
import { dbEngineTypeCRUDConfiguration } from '../../db-engine-type.constants';
import { DbEngineTypeService } from '../../services/db-engine-type.service';

@Component({
  selector: 'app-db-engine-type-edit',
  templateUrl: './db-engine-type-edit.component.html',
})
export class DbEngineTypeEditComponent extends CrudItemEditComponent<DbEngineType> {
  constructor(
    protected injector: Injector,
    public dbEngineTypeService: DbEngineTypeService
  ) {
    super(injector, dbEngineTypeService);
    this.crudConfiguration = dbEngineTypeCRUDConfiguration;
  }
}
