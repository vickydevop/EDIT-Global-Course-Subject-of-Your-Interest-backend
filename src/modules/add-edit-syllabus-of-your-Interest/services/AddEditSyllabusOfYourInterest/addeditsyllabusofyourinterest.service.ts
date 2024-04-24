/*
https://docs.nestjs.com/providers#services
*/
import { HttpStatus, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/app.module';
import * as mysql from 'mysql2';
import * as countryCityStateJson from 'countrycitystatejson';
import { log } from 'console';
import { HelperService } from 'src/common/services/helper/helper.service';

const { DateTime } = require('luxon');

@Injectable()
export class AddEditSyllabusOfYourInterestService {
  constructor(private helper: HelperService) { }
  async globalSyllabus(country_code, customer_id, user_id) {
    try {
      const dbName = `${country_code}_${customer_id}_edu_customer_db`;
      let finalResult_1: any[] = [];
      let loginUserInterestedCourseSubjects: any[] = [];
      let joinedTwoArrays: any[] = [];

      // const courseSubjectIds = await dbConnection.query(`
      //       select
      //       a.course_subject_user_category_allocation_id,
      //       b.institutional_course_subject_id as institutional_course_subject_id_dummy,
      //       b.term_semester_id,
      //       c.institutional_course_subject_id,
      //       c.global_course_subject_id,
      //       c.educational_institution_category_country_code,
      //       c.educational_institution_category_id,
      //       b.term_semester_or_other
      //       from ${dbName}.35_userapp_schedule_wise_teaching_faculty_and_location a
      //       left join
      //       ${dbName}.30_userapp_student_user_category_wise_assigned_courses_subjects b on
      //       a.course_subject_user_category_allocation_id=b.course_subject_user_category_allocation_id
      //       left join
      //       ${dbName}.30_userapp_institutional_study_subjects_courses c on
      //       c.institutional_course_subject_id=b.institutional_course_subject_id
      //       where a.teaching_faculty_user_id=${mysql.escape(
      //         user_id,
      //       )} group by a.course_subject_user_category_allocation_id;`);

      // // console.log(courseSubjectIds,"courseSubjectIds");

      // for (let i = 0; i < courseSubjectIds.length; i++) {
      //   if (courseSubjectIds[i].global_course_subject_id != null) {
      //     // console.log('if')
      //     // * to get global TamilNadu Samacheer Kalvi - IN name
      //     // console.log(courseSubjectIds[i].educational_institution_category_id,'courseSubjectIds[i].educational_institution_category_id')
      //     const globalEducationalInstitutionName = await dbConnection.query(`
      //     select educational_institution_category_name from
      //     edu_user_app_db.educational_institutions_categories
      //     where educational_institution_category_id=${mysql.escape(
      //       courseSubjectIds[i].educational_institution_category_id,
      //     )}`);
      //     //  console.log(globalEducationalInstitutionName,"globalEducationalInstitutionName");

      //     const globalSyllabusNameAndType = await dbConnection.query(`
      //       select course_subject_name,course_subject_type, educational_institutional_category_country_code from
      //       edu_user_apps_common_data_db.default_global_subjects_courses_for_educational_Inst_categories
      //       where global_course_subject_id=${mysql.escape(
      //         courseSubjectIds[i].global_course_subject_id,
      //       )}
      //       and educational_institutional_category_country_code=${mysql.escape(
      //         courseSubjectIds[i].educational_institution_category_country_code,
      //       )}
      //       and educational_institutional_category_id=${mysql.escape(
      //         courseSubjectIds[i].educational_institution_category_id,
      //       )}`);
      //     // console.log(globalSyllabusNameAndType,"globalSyllabusNameAndType");

      //     let element = courseSubjectIds[i];
      //     finalResult.push({
      //       ...element,
      //       educational_institution_category_country_code_name:
      //         countryCityStateJson.getCountryByShort(
      //           courseSubjectIds[
      //             i
      //           ]?.educational_institution_category_country_code?.toUpperCase(),
      //         )?.name,
      //       educational_institution_category_name:
      //         globalEducationalInstitutionName[0]
      //           ?.educational_institution_category_name,
      //       course_subject_name:
      //         globalSyllabusNameAndType[0]?.course_subject_name,
      //       course_subject_type:
      //         globalSyllabusNameAndType[0]?.course_subject_type,
      //       educational_institutional_category_country_code:
      //         globalSyllabusNameAndType[0]
      //           ?.educational_institutional_category_country_code,
      //     });
      //   } else {
      //   }
      // }

      // const tableExistorNot = await dbConnection.query(`
      //   SELECT count(*) as db FROM information_schema.tables
      //   WHERE table_schema = '${dbName}'AND table_name = '${mysql.escape(
      //   user_id,
      // )}_user_id_global_course_subject_of_interest'LIMIT 1;`);
      // // console.log(tableExistorNot[0].db);
      // if (tableExistorNot[0].db == 0) {
      //   return finalResult;
      // } else {
      //   loginUserInterestedCourseSubjects = await dbConnection.query(`
      //   select * from ${dbName}.${mysql.escape(user_id)}_user_id_global_course_subject_of_interest order by id desc`);
      // }
      // console.log(`${country_code}_${customer_id}_edu_customer_db`,`${mysql.escape(user_id)}`,user_id,'${country_code');
      if ((await this.helper.tableExists(`${country_code}_${customer_id}_edu_customer_db`, `${user_id}_user_id_global_course_subject_of_interest`)) == 1) {
        // console.log('if');
        loginUserInterestedCourseSubjects = await dbConnection.query(`
        select * from ${country_code}_${customer_id}_edu_customer_db.${user_id}_user_id_global_course_subject_of_interest order by id desc`);

        // console.log(loginUserInterestedCourseSubjects,'loginUserInterestedCourseSubjects')
        if (loginUserInterestedCourseSubjects.length > 0) {
          for (let j = 0; j < loginUserInterestedCourseSubjects.length; j++) {
            // * to get global TamilNadu Samacheer Kalvi - IN name
            const loginUserGlobalEducationalInstitutionName =
              await dbConnection.query(`
            select educational_institution_category_name from
            edu_user_app_db.educational_institutions_categories
            where educational_institution_category_id=${mysql.escape(
                loginUserInterestedCourseSubjects[j]
                  .educational_institution_category_id,
              )}`);

            const loginUserGlobalSyllabusNameAndType = await dbConnection.query(`
             select * from
             edu_user_apps_common_data_db.default_global_subjects_courses_for_educational_Inst_categories
             where global_course_subject_id=${loginUserInterestedCourseSubjects[j].global_course_subject_id
              }
             and educational_institutional_category_country_code=${mysql.escape(
                loginUserInterestedCourseSubjects[j]
                  .educational_institution_category_country_code,
              )}
             and educational_institutional_category_id= ${mysql.escape(
                loginUserInterestedCourseSubjects[j]
                  .educational_institution_category_id,
              )} and is_active = 1`);

            //  console.log("testtttttttttttttttttttttt!!",loginUserGlobalSyllabusNameAndType);

            let element = loginUserInterestedCourseSubjects[j];
            finalResult_1.push({
              ...element,
              educational_institution_category_country_code_name:
                countryCityStateJson.getCountryByShort(
                  loginUserInterestedCourseSubjects[
                    j
                  ].educational_institution_category_country_code.toUpperCase(),
                )?.name,
              educational_institution_category_name:
                loginUserGlobalEducationalInstitutionName[0]
                  ?.educational_institution_category_name,
              course_subject_name:
                loginUserGlobalSyllabusNameAndType[0]?.course_subject_name,
              course_subject_type:
                loginUserGlobalSyllabusNameAndType[0]?.course_subject_type,
              educational_institutional_category_country_code:
                loginUserGlobalSyllabusNameAndType[0]
                  ?.educational_institutional_category_country_code,
            });
          }
        }
        joinedTwoArrays = finalResult_1;
      } else {
        // console.log('else');

      }
      // console.log(loginUserInterestedCourseSubjects.length,'loginUserInterestedCourseSubjects');


      return joinedTwoArrays;
    } catch (error) {
      throw error;
    }
  }

  async getSyllabusofyourinterest(
    country_code,
    customer_id,
    user_id,
    educational_institutional_category_country_code,
    educational_institution_category_id,
  ) {
    try {
      let data: any[] = [];
      let syllabus_name: any[] = [];
      // for (let i = 0; i < category.length; i++) {
      let get_data: any;
      if ((await this.helper.tableExists(`edu_user_apps_common_data_db`, `default_global_subjects_courses_for_educational_Inst_categories`)) == 1) {

        get_data = await dbConnection.query(`SELECT *
         FROM edu_user_apps_common_data_db.default_global_subjects_courses_for_educational_Inst_categories 
         where educational_institutional_category_country_code = ${mysql.escape(
          educational_institutional_category_country_code,
        )}
         and educational_institutional_category_id = ${mysql.escape(
          educational_institution_category_id,
        )} and is_active =1 order by effective_from_datetime desc`);
      }

      // console.log(get_data,user_id,'get_data')
      if (
        (await this.helper.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `${user_id}_user_id_global_course_subject_of_interest`,
        )) == 1
      ) {
        let a_get_data = await dbConnection.query(`
          select * from ${country_code}_${customer_id}_edu_customer_db.${user_id}_user_id_global_course_subject_of_interest 
          where educational_institution_category_country_code =${mysql.escape(
          educational_institutional_category_country_code,
        )} and educational_institution_category_id =${mysql.escape(
          educational_institution_category_id,
        )}`);
        // console.log(a_get_data.length,a_get_data, 'a_get_data.length');
        let filter_Data = (item: any) => {
          for (let i = 0; i < a_get_data.length; i++) {
            if (a_get_data[i].global_course_subject_id == item) {
              return 1;
            }
          }
          return -1;
        };
        let all_get_datas: any[] = [];
        const subjectIdToDataMap = new Map<number, any>();
        for (let i = 0; i < get_data?.length; i++) {
          // console.log(filter_Data(get_data),'filter_Data(get_data)')
          if (filter_Data(get_data[i]?.global_course_subject_id) == -1) {
            all_get_datas.push(get_data[i]);
          }
        }
        // console.log(all_get_datas,'all_get_datas');
        // Sort the data in descending order based on last_update_datetime
        const sortedData = all_get_datas.sort(
          (a, b) =>
            Date.parse(b.last_update_datetime) -
            Date.parse(a.last_update_datetime),
        );

        // Iterate through the sorted data and keep track of the latest last_update_datetime for each global_course_subject_id
        for (const course of sortedData) {
          const subjectId = course.global_course_subject_id;
          if (!subjectIdToDataMap.has(subjectId)) {
            subjectIdToDataMap.set(subjectId, course);
          }
        }

        // Create a new array containing the filtered data with the most recent entries for each global_course_subject_id
        const mostRecentCourses = Array.from(subjectIdToDataMap.values());

        const orderedCourses = mostRecentCourses.sort(
          (a, b) => a.global_course_subject_id - b.global_course_subject_id,
        );
        // console.log(mostRecentCourses,'mostRecentCourses');
        // console.log(orderedCourses,'orderedCourses')

        for (let j = 0; j < orderedCourses.length; j++) {
          data.push({
            global_course_subject_id:
              orderedCourses[j].global_course_subject_id,
            course_subject_name: orderedCourses[j].course_subject_name,
            course_subject_type: orderedCourses[j].course_subject_type,
          });
        }
      }

      // console.log(data, 'kljdf');

      return data;
    } catch (error) {
      throw error;
    }
  }

  async insert_global_id(
    country_code,
    customer_id,
    user_id,
    time_zone_iana_string,
    educational_institution_category_country_code,
    educational_institution_category_id,
    global_course_subject_id,
  ) {
    try {
      // console.log('1',educational_institution_category_country_code,educational_institution_category_id,global_course_subject_id)
      let data: any[] = [];
      var local = DateTime.local({ zone: time_zone_iana_string });
      var overrideZone = DateTime.fromISO(local, {
        zone: time_zone_iana_string,
      });
      var requestdate = overrideZone.toString();

      if ((await this.helper.tableExists(`${country_code}_${customer_id}_edu_customer_db`, `${user_id}_user_id_global_course_subject_of_interest`)) == 1) {
        for (let i = 0; i < global_course_subject_id.length; i++) {
          const treeData = await dbConnection.query(`
        insert into ${country_code}_${customer_id}_edu_customer_db.${user_id}_user_id_global_course_subject_of_interest(
          educational_institution_category_country_code,
          educational_institution_category_id,
          global_course_subject_id
          )value
          (
            ${mysql.escape(educational_institution_category_country_code)},
            ${mysql.escape(educational_institution_category_id)},
            ${mysql.escape(global_course_subject_id[i])}
  
          )
          `);
        }
        // aduit trail
        if ((await this.helper.tableExists(`${country_code}_${customer_id}_edu_customer_db`, `audit_trail_for_global_course_of_your_interest`)) == 1) {

          const a = await dbConnection.query(`
            insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_global_course_of_your_interest
            (
        entry_by_user_id,
        entry_type, 
        app_id,
        entry_date_time
            )
            values
            (
              ${mysql.escape(user_id)},
              'Insert',
              'p1',
              ${mysql.escape(requestdate)} 
            )
           `);
        } else {
          await dbConnection.query(`create table ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_global_course_of_your_interest(
          id int not null auto_increment primary key,
          entry_by_user_id int,
          entry_type varchar(10), 
          app_id varchar(10),
          entry_date_time datetime
        )`);
          const a = await dbConnection.query(`
        insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_global_course_of_your_interest
        (
    entry_by_user_id,
    entry_type, 
    app_id,
    entry_date_time
        )
        values
        (
          ${mysql.escape(user_id)},
          'Insert',
          'p1',
          ${mysql.escape(requestdate)} 
        )
       `);
        }
      } else {
        await dbConnection.query(`create table ${country_code}_${customer_id}_edu_customer_db.${user_id}_user_id_global_course_subject_of_interest(
          id int not null auto_increment primary key,
          educational_institution_category_country_code varchar(3),
          educational_institution_category_id varchar(25),
          global_course_subject_id int
        )`);
        for (let i = 0; i < global_course_subject_id.length; i++) {
          const treeData = await dbConnection.query(`
        insert into ${country_code}_${customer_id}_edu_customer_db.${user_id}_user_id_global_course_subject_of_interest(
          educational_institution_category_country_code,
          educational_institution_category_id,
          global_course_subject_id
          )value
          (
            ${mysql.escape(educational_institution_category_country_code)},
            ${mysql.escape(educational_institution_category_id)},
            ${mysql.escape(global_course_subject_id[i])}
  
          )
          `);
        }
        // aduit trail
        if ((await this.helper.tableExists(`${country_code}_${customer_id}_edu_customer_db`, `audit_trail_for_global_course_of_your_interest`)) == 1) {

          const a = await dbConnection.query(`
              insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_global_course_of_your_interest
              (
          entry_by_user_id,
          entry_type, 
          app_id,
          entry_date_time
              )
              values
              (
                ${mysql.escape(user_id)},
                'Insert',
                'p1',
                ${mysql.escape(requestdate)} 
              )
             `);
        } else {
          await dbConnection.query(`create table ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_global_course_of_your_interest(
            id int not null auto_increment primary key,
            entry_by_user_id int,
            entry_type varchar(10), 
            app_id varchar(10),
            entry_date_time datetime
          )`);
          const a = await dbConnection.query(`
          insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_global_course_of_your_interest
          (
      entry_by_user_id,
      entry_type, 
      app_id,
      entry_date_time
          )
          values
          (
            ${mysql.escape(user_id)},
            'Insert',
            'p1',
            ${mysql.escape(requestdate)} 
          )
         `);
        }
      }


      return data;
    } catch (error) {
      throw error;
    }
  }

  async check_global_id(
    country_code,
    customer_id,
    user_id,
    educational_institution_category_country_code,
    educational_institution_category_id,
  ) {
    try {
      let check_data_from_table: any = [];
      if ((await this.helper.tableExists(`${country_code}_${customer_id}_edu_customer_db`, `${user_id}_user_id_global_course_subject_of_interest`)) == 1) {
        const check_data = await dbConnection.query(`
        select global_course_subject_id from ${country_code}_${customer_id}_edu_customer_db.${user_id}_user_id_global_course_subject_of_interest 
        where educational_institution_category_country_code =${mysql.escape(
          educational_institution_category_country_code,
        )} and educational_institution_category_id =${mysql.escape(
          educational_institution_category_id,
        )}`);

        for (let i = 0; i < check_data.length; i++) {
          check_data_from_table.push(check_data[i].global_course_subject_id);
        }
      }
      return check_data_from_table;
    } catch (error) {
      throw error;
    }
  }
  async delete_global_id(
    country_code,
    customer_id,
    user_id,
    time_zone_iana_string,
    educational_institution_category_country_code,
    educational_institution_category_id,
    global_course_subject_id,
  ) {
    try {
      // console.log(
      //   country_code,
      //   customer_id,
      //   user_id,
      //   time_zone_iana_string,
      //   educational_institution_category_id,
      //   educational_institution_category_country_code,
      //   global_course_subject_id,
      //   'a',
      // );
      let data: any[] = [];
      var local = DateTime.local({ zone: time_zone_iana_string });
      var overrideZone = DateTime.fromISO(local, {
        zone: time_zone_iana_string,
      });
      var requestdate = overrideZone.toString();

      const Data = await dbConnection.query(`
      Delete from ${country_code}_${customer_id}_edu_customer_db.${user_id}_user_id_global_course_subject_of_interest 
      where educational_institution_category_country_code = ${mysql.escape(
        educational_institution_category_country_code,
      )}
      and global_course_subject_id = ${mysql.escape(global_course_subject_id)} 
      and educational_institution_category_id = ${mysql.escape(
        educational_institution_category_id,
      )};`);

      // aduit trail

      if (
        (await this.helper.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `audit_trail_for_global_course_of_your_interest`,
        )) == 1
      ) {
        const a = await dbConnection.query(`
        insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_global_course_of_your_interest
        (
        entry_by_user_id,
        entry_type, 
        app_id,
        entry_date_time
        )
        values
        (
          ${mysql.escape(user_id)},
          'delete',
          'p1',
          ${mysql.escape(requestdate)} 
        )
       `);
      } else {
        await dbConnection.query(`
        `);
        const a = await dbConnection.query(`
            insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_global_course_of_your_interest
            (
        entry_by_user_id,
        entry_type, 
        app_id,
        entry_date_time
            )
            values
            (
              ${mysql.escape(user_id)},
              'delete',
              'p1',
              ${mysql.escape(requestdate)} 
            )
           `);
      }

      return Data;
    } catch (error) {
      throw error;
    }
  }

  async createtablebasedonuserid(country_code, customer_id, user_id,) {
    try {
      if ((await this.helper.tableExists(`${country_code}_${customer_id}_edu_customer_db`, `${user_id}_user_id_global_course_subject_of_interest`,)) == 1) {
        console.log('here', country_code, customer_id, user_id)
      } else {
        console.log('not', country_code, customer_id, user_id)
        // console.log('not',)
        await dbConnection.query(`create table ${country_code}_${customer_id}_edu_customer_db.${user_id}_user_id_global_course_subject_of_interest(
          id int not null auto_increment primary key,
          educational_institution_category_country_code varchar(3),
          educational_institution_category_id varchar(100),
          global_course_subject_id int
        )`);
      }
      return
    } catch (error) {
      throw error
    }
  }

  // check data for remove button 
  async check_data_for_remove_button(country_code, customer_id, user_id, educational_institution_category_id, educational_institution_category_country_code, global_course_subject_id, app_type) {
    try {

      // console.log(country_code,educational_institution_category_country_code,global_course_subject_id,'gt');
      let check_data: any;
      // 0 - Global WOW Video
      if (app_type == 0) {
        if ((await this.helper.tableExists(`${country_code}_${customer_id}_edu_customer_db`, `33_userapp_institutional_wow_videos_global_syllabus_linkage`)) == 1) {
          check_data =
          await dbConnection.query(`SELECT count(*) as count FROM ${country_code}_${customer_id}_edu_customer_db.33_userapp_institutional_wow_videos_global_syllabus_linkage
          where educational_institution_category_id = ${mysql.escape(educational_institution_category_id)} 
          and educational_institution_category_country_code=${mysql.escape(educational_institution_category_country_code)} 
          and course_subject_id = ${mysql.escape(global_course_subject_id)};`);
        }
      } 
      // 1 - Global WOW FlashCards
      else if (app_type == 1) {
        if ((await this.helper.tableExists(`${country_code}_${customer_id}_edu_customer_db`, `34_userapp_institutional_wow_flashcards_global_syllabus_linkage`)) == 1) {
          check_data =
          await dbConnection.query(`SELECT count(*) as count FROM ${country_code}_${customer_id}_edu_customer_db.34_userapp_institutional_wow_flashcards_global_syllabus_linkage
          where educational_institution_category_id = ${mysql.escape(educational_institution_category_id)} 
          and educational_institution_category_country_code=${mysql.escape(educational_institution_category_country_code)} 
          and course_subject_id = ${mysql.escape(global_course_subject_id)};`);
        }
      } 
      // 2 - Global WOW Resources
      else if (app_type == 2) {
        if ((await this.helper.tableExists(`${country_code}_${customer_id}_edu_customer_db`, `31_userapp_institutional_wow_resources_syllabus_linkage`)) == 1) {
          check_data =
            await dbConnection.query(`SELECT count(*) as count FROM ${country_code}_${customer_id}_edu_customer_db.31_userapp_institutional_wow_resources_syllabus_linkage
          where educational_institution_category_id = ${mysql.escape(educational_institution_category_id)} and educational_institution_category_country_code=${mysql.escape(educational_institution_category_country_code)} and course_subject_id = ${mysql.escape(global_course_subject_id)};`);
        }
      }
      else if (app_type == 3) {
        if ((await this.helper.tableExists(`${country_code}_${customer_id}_edu_customer_db`, `32_userapp_institutional_wow_assignment_global_syllabus_linkage`)) == 1) {
          check_data =
            await dbConnection.query(`SELECT count(*) as count FROM ${country_code}_${customer_id}_edu_customer_db.32_userapp_institutional_wow_assignment_global_syllabus_linkage
          where educational_institution_category_id = ${mysql.escape(educational_institution_category_id)} and educational_institution_category_country_code=${mysql.escape(educational_institution_category_country_code)} and course_subject_id = ${mysql.escape(global_course_subject_id)};`);
        }
      }
      return check_data;
    } catch (error) {
      throw error
    }
  }
}
