/*
https://docs.nestjs.com/controllers#controllers
*/

import { AddEditSyllabusOfYourInterestService } from '../../services/AddEditSyllabusOfYourInterest/addeditsyllabusofyourinterest.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthService } from 'src/auth/services/auth.service';
// import { SyllabusId } from 'src/dto/syllabusid.dto';
import { Request } from 'express';
import ResponseInterface from 'src/models/interface/response.interface';
import { global_course_subject_id } from 'src/models/dto/user.dto';
import { get } from 'http';
import { log } from 'console';

@Controller()
export class AddEditSyllabusOfYourInterestController {
  constructor(
    private api: AddEditSyllabusOfYourInterestService,
    private _authService: AuthService,
  ) {}

  @ApiTags('Authentication')
  @Get('get--token-gen')
  async getTOkenGen(@Req() req: Request): Promise<ResponseInterface> {
    try {
      const payload = {
        user_id: "1",
        customer_id: 105,
        country_code: "in",
        customer_sub_domain_name: "vk",
        registered_educational_institution_name: "cvicky",
        time_zone_iana_string: "Asia/Calcutta",
        app_name: "vk",
        default_currency_shortform: "INR",
        accounting_standards_id: null,
        is_default_academic_year_format_spanning_two_calendar_years: 1,
        default_academic_year_start_date_and_month: "6/12",
        socket_id: "",
        user_category_type: "4",
        educational_institution_category_id: "6rcZg1MaEONVSPZ",
        user_registered_categories_ids: "w3YoxBJpUHpSCdu",
        user_registration_login_approval_status: 3,
        country: "in",
        pin_code: "rtyry",
        state_province: "Tamil Nadu",
        city_district_county: "Tirupattur",
        address_line_1: "Vaniyambadi",
        address_line_2: "Vaniyambadi",
        customer_type: 0,
        app_type:1
      }
      const token = await this._authService.generateJwt(payload);

      // console.log("token", token);

      return {
        statusCode: 200,
        message: 'Get data successful',
        data: token,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Your-global-wow-resources')
  @Get(
    'userapp-schedule-wise-teaching-faculty-and-location-get-syllabus-details',
  )
  async convertor(
    // @Query('page_no') page_no: number,
    // @Query("per_page") per_page: number,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.globalSyllabus(
        country_code,
        customer_id,
        user_id,
        // page_no,per_page

        // user_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Add-Edit-Syllabus-Of-Your-Interest')
  @Get('get-syllabus-of-your-interest')
  async getSyllabusofyourinterest(
    @Query('educational_institutional_category_country_code')
    educational_institutional_category_country_code: string,
    // @Query('educational_institutional_category_id') educational_institutional_category_id:string,
    @Query('educational_institution_category_id')
    educational_institution_category_id: string,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.getSyllabusofyourinterest(
        country_code,
        customer_id,
        user_id,
        educational_institutional_category_country_code,
        educational_institution_category_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Add-Edit-Syllabus-Of-Your-Interest')
  @Post('insert-syllabus-of-your-interest')
  async insert_global_id(
    @Query('educational_institution_category_country_code')
    educational_institution_category_country_code: string,
    // @Query('educational_institution_category_id') educational_institution_category_id:string,
    // @Query('global_course_syllabus_id') global_course_syllabus_id:number,
    @Query('educational_institution_category_id')
    educational_institution_category_id: string,
    @Body() global_course_subject_id: global_course_subject_id,
    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      // console.log(token,'token')
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, user_id, time_zone_iana_string } =
        _data;

      const data = await this.api.insert_global_id(
        country_code,
        customer_id,
        user_id,
        time_zone_iana_string,
        educational_institution_category_country_code,
        educational_institution_category_id,
        global_course_subject_id,
        // user_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('check-syllabus-of-your-interest')
  async check_global_id(
    @Query('educational_institution_category_country_code')
    educational_institution_category_country_code: string,
    @Query('educational_institution_category_id')
    educational_institution_category_id: string,
    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      // console.log(token,'token')
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, user_id, time_zone_iana_string } =
        _data;

      const data = await this.api.check_global_id(
        country_code,
        customer_id,
        user_id,
        educational_institution_category_country_code,
        educational_institution_category_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Add-Edit-Syllabus-Of-Your-Interest')
  @Delete('delete-syllabus-of-your-interest')
  async delete_global_id(
    @Query('educational_institution_category_country_code')
    educational_institution_category_country_code: string,
    @Query('educational_institution_category_id')
    educational_institution_category_id: string,
    @Query('global_course_syllabus_id') global_course_syllabus_id: number,
    // @Body() category:category_ids,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      // console.log(token,'token')
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, user_id, time_zone_iana_string } =
        _data;

      const data = await this.api.delete_global_id(
        country_code,
        customer_id,
        user_id,
        time_zone_iana_string,
        educational_institution_category_country_code,
        educational_institution_category_id,
        global_course_syllabus_id,
        // user_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post('create-table-based-on-user-id')
  async createtablebasedonuserid(
    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      // console.log(token,'token')
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, user_id, time_zone_iana_string } =
        _data;

      const data = await this.api.createtablebasedonuserid(
        country_code,
        customer_id,
        user_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }


  // check data for remove button 
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('check-data-for-remove-button')
  async check_data_for_remove_button(
    @Query('educational_institution_category_id') educational_institution_category_id: string,
    @Query('educational_institution_category_country_code') educational_institution_category_country_code: string,
    @Query('global_course_subject_id') global_course_subject_id: number,
    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id,app_type } = _data;

      const data = await this.api.check_data_for_remove_button(
        country_code,
        customer_id,
        user_id,
        educational_institution_category_id,
        educational_institution_category_country_code,
        global_course_subject_id,
        app_type
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
