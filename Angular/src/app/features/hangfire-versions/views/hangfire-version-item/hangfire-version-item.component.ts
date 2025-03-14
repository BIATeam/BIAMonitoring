import { Component, Injector, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { BiaLayoutService } from 'src/app/shared/bia-shared/components/layout/services/layout.service';
import { CrudItemItemComponent } from 'src/app/shared/bia-shared/feature-templates/crud-items/views/crud-item-item/crud-item-item.component';
import { AppState } from 'src/app/store/state';
import { HangfireVersion } from '../../model/hangfire-version';
import { HangfireVersionService } from '../../services/hangfire-version.service';

@Component({
  selector: 'app-hangfire-versions-item',
  templateUrl:
    '../../../../shared/bia-shared/feature-templates/crud-items/views/crud-item-item/crud-item-item.component.html',
  styleUrls: [
    '../../../../shared/bia-shared/feature-templates/crud-items/views/crud-item-item/crud-item-item.component.scss',
  ],
})
export class HangfireVersionItemComponent
  extends CrudItemItemComponent<HangfireVersion>
  implements OnInit
{
  constructor(
    protected store: Store<AppState>,
    protected injector: Injector,
    public hangfireVersionService: HangfireVersionService,
    protected layoutService: BiaLayoutService
  ) {
    super(injector, hangfireVersionService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.sub.add(
      this.hangfireVersionService.displayItemName$.subscribe(displayItemName => {
        if (displayItemName) {
          this.route.data.pipe(first()).subscribe(routeData => {
            (routeData as any)['breadcrumb'] = displayItemName;
          });
          this.layoutService.refreshBreadcrumb();
        }
      })
    );
  }
}
