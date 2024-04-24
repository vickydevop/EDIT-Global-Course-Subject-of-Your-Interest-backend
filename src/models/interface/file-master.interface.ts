import { CommonFieldsInterface } from './common-fields.interface';

export class AddFileMasterInterface extends CommonFieldsInterface {
  uploaded_created_by_user_id: number;
  uploaded_created_utc_date_time: string;
  is_uploaded_via_other_userapp: boolean;
  is_uploaded_via_customapp: boolean;
  app_id: number;
  mapping_id: string;
  mapping_parent: string;
}

export interface UpdateFileMasterDto
  extends Omit<
    AddFileMasterInterface,
    | 'app_id'
    | 'is_uploaded_via_other_userapp'
    | 'is_uploaded_via_customapp'
    | 'mapping_parent'
    | 'mapping_id'
    | 'is_moved_to_recycle_bin'
  > {
  //OmitType(AddFileMasterDto, ['attachments'] as const)
  cloud_file_id: number;
}
