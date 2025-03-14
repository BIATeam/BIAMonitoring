import { Injectable, Injector } from '@angular/core';
import { AbstractDas } from 'src/app/core/bia-core/services/abstract-das.service';
import { DbEngineType } from '../model/db-engine-type';

@Injectable({
  providedIn: 'root',
})
export class DbEngineTypeDas extends AbstractDas<DbEngineType> {
  constructor(injector: Injector) {
    super(injector, 'DbEngineTypes');
  }
}
