import { Injectable, Injector } from '@angular/core';
import { AbstractDas } from 'src/app/core/bia-core/services/abstract-das.service';
import { HangfireVersion } from '../model/hangfire-version';

@Injectable({
  providedIn: 'root',
})
export class HangfireVersionDas extends AbstractDas<HangfireVersion> {
  constructor(injector: Injector) {
    super(injector, 'HangfireVersions');
  }
}
