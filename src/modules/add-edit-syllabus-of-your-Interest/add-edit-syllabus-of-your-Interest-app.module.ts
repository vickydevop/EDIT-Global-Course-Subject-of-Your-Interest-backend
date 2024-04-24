import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { QueryProceduresModule } from './query-procedures/query-procedures.module';
import { AddEditSyllabusOfYourInterestController } from './controllers/AddEditSyllabusOfYourInterest/addeditsyllabusofyourinterest.controller';
import { AddEditSyllabusOfYourInterestService } from './services/AddEditSyllabusOfYourInterest/addeditsyllabusofyourinterest.service';
import { HelperService } from 'src/common/services/helper/helper.service';


@Module({
  imports: [QueryProceduresModule, AuthModule],
  controllers: [AddEditSyllabusOfYourInterestController],
  providers: [ AddEditSyllabusOfYourInterestService,HelperService],
})
export class AddEditSyllabusOfYourInterestAppModule {}
