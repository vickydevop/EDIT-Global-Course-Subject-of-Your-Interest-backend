import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CommonFieldsDto } from './common-fields.dto';

export class AddFileMasterDto extends CommonFieldsDto {
  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  uploaded_created_by_user_id: number;
  @ApiProperty({ default: '2022-09-08T08:33:40.714Z' })
  uploaded_created_utc_date_time: string;
  @ApiProperty({ default: false, required: false })
  is_uploaded_via_other_userapp: boolean;
  @ApiProperty({ default: false, required: false })
  is_uploaded_via_customapp: boolean;
  @ApiProperty({ default: 5 })
  @IsNotEmpty()
  app_id: number;
  @ApiProperty({ default: '123d-234d-5678-23dd' })
  @IsNotEmpty()
  mapping_id: string;
  @IsNotEmpty()
  @ApiProperty({ default: 'root' })
  mapping_parent: string;
}

export class UpdateFileMasterDto extends OmitType(AddFileMasterDto, [
  'app_id',
  'is_uploaded_via_other_userapp',
  'is_uploaded_via_customapp',
  'mapping_parent',
  'mapping_id',
] as const) {
  //OmitType(AddFileMasterDto, ['attachments'] as const)
  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  cloud_file_id: number;
}
