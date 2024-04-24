import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CommonFieldsDto } from './common-fields.dto';

export class NewUserDto extends CommonFieldsDto {
  @ApiProperty()
  @IsNotEmpty()
  user_name: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  mobile_no: number;
}

export class global_course_subject_id{
  @ApiProperty()
  global_course_subject_id:string[]
}

