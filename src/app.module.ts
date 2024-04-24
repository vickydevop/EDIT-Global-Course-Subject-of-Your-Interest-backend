import { AddEditSyllabusOfYourInterestController } from './modules/add-edit-syllabus-of-your-Interest/controllers/AddEditSyllabusOfYourInterest/addeditsyllabusofyourinterest.controller';
import { AddEditSyllabusOfYourInterestService } from './modules/add-edit-syllabus-of-your-Interest/services/AddEditSyllabusOfYourInterest/addeditsyllabusofyourinterest.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import dbConfig from './config/db.config';
// import { CloudStorageAppModule } from './modules/cloud-storage-app/cloud-storage-app.module';
import { AddEditSyllabusOfYourInterestAppModule } from './modules/add-edit-syllabus-of-your-Interest/add-edit-syllabus-of-your-Interest-app.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AddEditSyllabusOfYourInterestAppModule,
  ],
  controllers: [
   ],
  providers: [
   ],
})
export class AppModule { }
// Established connection to database

export const dbConnection = new DataSource(dbConfig());
dbConnection
  .initialize()
  .then(() => {
    console.log(
      `Data Source has been initialized! "${process.env.DB_HOST},${process.env.DB_USERNAME},${process.env.DB_PASSWORD}"`,
    );
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
