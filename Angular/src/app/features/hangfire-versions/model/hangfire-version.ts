import { Validators } from '@angular/forms';
import { BaseDto } from 'src/app/shared/bia-shared/model/base-dto';
import {
  BiaFieldConfig,
  BiaFieldsConfig,
} from 'src/app/shared/bia-shared/model/bia-field-config';

// TODO after creation of CRUD HangfireVersion : adapt the model
export class HangfireVersion extends BaseDto {
  /// BIAToolKit - Begin Properties
  version: string;
  /// BIAToolKit - End Properties
}

// TODO after creation of CRUD HangfireVersion : adapt the field configuration
export const hangfireVersionFieldsConfiguration: BiaFieldsConfig<HangfireVersion> =
  {
    columns: [
      /// BIAToolKit - Begin Block version
      Object.assign(new BiaFieldConfig('version', 'hangfireVersion.version'), {
        isRequired: true,
        validators: [Validators.required, Validators.maxLength(64)],
      }),
      /// BIAToolKit - End Block version
    ],
  };
