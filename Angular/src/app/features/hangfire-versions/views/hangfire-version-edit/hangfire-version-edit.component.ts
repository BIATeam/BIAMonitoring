import { Component, Injector } from '@angular/core';
import { CrudItemEditComponent } from 'src/app/shared/bia-shared/feature-templates/crud-items/views/crud-item-edit/crud-item-edit.component';
import { HangfireVersion } from '../../model/hangfire-version';
import { hangfireVersionCRUDConfiguration } from '../../hangfire-version.constants';
import { HangfireVersionService } from '../../services/hangfire-version.service';

@Component({
  selector: 'app-hangfire-version-edit',
  templateUrl: './hangfire-version-edit.component.html',
})
export class HangfireVersionEditComponent extends CrudItemEditComponent<HangfireVersion> {
  constructor(
    protected injector: Injector,
    public hangfireVersionService: HangfireVersionService
  ) {
    super(injector, hangfireVersionService);
    this.crudConfiguration = hangfireVersionCRUDConfiguration;
  }
}
