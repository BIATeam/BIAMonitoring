import { Component, Injector, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { BiaLayoutService } from 'src/app/shared/bia-shared/components/layout/services/layout.service';
import { CrudItemItemComponent } from 'src/app/shared/bia-shared/feature-templates/crud-items/views/crud-item-item/crud-item-item.component';
import { AppState } from 'src/app/store/state';
import { DbEngineType } from '../../model/db-engine-type';
import { DbEngineTypeService } from '../../services/db-engine-type.service';

@Component({
  selector: 'app-db-engine-types-item',
  templateUrl:
    '../../../../shared/bia-shared/feature-templates/crud-items/views/crud-item-item/crud-item-item.component.html',
  styleUrls: [
    '../../../../shared/bia-shared/feature-templates/crud-items/views/crud-item-item/crud-item-item.component.scss',
  ],
})
export class DbEngineTypeItemComponent
  extends CrudItemItemComponent<DbEngineType>
  implements OnInit
{
  constructor(
    protected store: Store<AppState>,
    protected injector: Injector,
    public dbEngineTypeService: DbEngineTypeService,
    protected layoutService: BiaLayoutService
  ) {
    super(injector, dbEngineTypeService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.sub.add(
      this.dbEngineTypeService.displayItemName$.subscribe(displayItemName => {
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
