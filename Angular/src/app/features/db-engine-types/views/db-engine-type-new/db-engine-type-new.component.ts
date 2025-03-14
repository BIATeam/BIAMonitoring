import { Component, Injector } from '@angular/core';
import { CrudItemNewComponent } from 'src/app/shared/bia-shared/feature-templates/crud-items/views/crud-item-new/crud-item-new.component';
import { DbEngineType } from '../../model/db-engine-type';
import { dbEngineTypeCRUDConfiguration } from '../../db-engine-type.constants';
import { DbEngineTypeService } from '../../services/db-engine-type.service';

@Component({
  selector: 'app-db-engine-type-new',
  templateUrl: './db-engine-type-new.component.html',
})
export class DbEngineTypeNewComponent extends CrudItemNewComponent<DbEngineType> {
  constructor(
    protected injector: Injector,
    public dbEngineTypeService: DbEngineTypeService
  ) {
    super(injector, dbEngineTypeService);
    this.crudConfiguration = dbEngineTypeCRUDConfiguration;
  }
}
