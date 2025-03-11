import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { storeKey } from './hangfire-version-option.contants';
import { reducers } from './store/hangfire-version-option.state';
import { HangfireVersionOptionsEffects } from './store/hangfire-version-options-effects';

@NgModule({
  imports: [
    StoreModule.forFeature(storeKey, reducers),
    EffectsModule.forFeature([HangfireVersionOptionsEffects]),
  ],
})
export class HangfireVersionOptionModule {}
