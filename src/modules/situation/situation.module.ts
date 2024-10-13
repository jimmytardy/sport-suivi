import { Module } from '@nestjs/common';
import { SituationController } from './situation.controller';
import { ActionModule } from './action/action.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Situation, SituationSchema } from 'src/models/Situation';
import { SituationService } from './Situation.service';

@Module({
  imports: [ActionModule, MongooseModule.forFeature([{ name: Situation.name, schema: SituationSchema }])],
  controllers: [SituationController],
  providers: [SituationService],
  exports: [SituationService]
})
export class SituationModule {}
