import { Component, Injector } from '@angular/core';
import { CrudItemNewComponent } from 'src/app/shared/bia-shared/feature-templates/crud-items/views/crud-item-new/crud-item-new.component';
import { HangfireVersion } from '../../model/hangfire-version';
import { hangfireVersionCRUDConfiguration } from '../../hangfire-version.constants';
import { HangfireVersionService } from '../../services/hangfire-version.service';

@Component({
  selector: 'app-hangfire-version-new',
  templateUrl: './hangfire-version-new.component.html',
})
export class HangfireVersionNewComponent extends CrudItemNewComponent<HangfireVersion> {
  constructor(
    protected injector: Injector,
    public hangfireVersionService: HangfireVersionService
  ) {
    super(injector, hangfireVersionService);
    this.crudConfiguration = hangfireVersionCRUDConfiguration;
  }
}
