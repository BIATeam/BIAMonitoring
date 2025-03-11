import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { storeKey } from './db-engine-type-option.contants';
import { reducers } from './store/db-engine-type-option.state';
import { DbEngineTypeOptionsEffects } from './store/db-engine-type-options-effects';

@NgModule({
  imports: [
    StoreModule.forFeature(storeKey, reducers),
    EffectsModule.forFeature([DbEngineTypeOptionsEffects]),
  ],
})
export class DbEngineTypeOptionModule {}
