import { Validators } from '@angular/forms';
import { BaseDto } from 'src/app/shared/bia-shared/model/base-dto';
import {
  BiaFieldConfig,
  BiaFieldsConfig,
} from 'src/app/shared/bia-shared/model/bia-field-config';

// TODO after creation of CRUD DbEngineType : adapt the model
export class DbEngineType extends BaseDto {
  /// BIAToolKit - Begin Properties
  name: string;
  /// BIAToolKit - End Properties
}

// TODO after creation of CRUD DbEngineType : adapt the field configuration
export const dbEngineTypeFieldsConfiguration: BiaFieldsConfig<DbEngineType> = {
  columns: [
    /// BIAToolKit - Begin Block name
    Object.assign(new BiaFieldConfig('name', 'dbEngineType.name'), {
      isRequired: true,
      validators: [Validators.required, Validators.maxLength(64)],
    }),
    /// BIAToolKit - End Block name
  ],
};
