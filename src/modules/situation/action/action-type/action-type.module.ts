import { Module } from '@nestjs/common';
import { ActionTypeController } from './action-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionType, ActionTypeSchema } from 'src/models/ActionType';
import { ActionTypeService } from './Action-type.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ActionType.name, schema: ActionTypeSchema }])],
  controllers: [ActionTypeController],
  providers: [ActionTypeService],
  exports: [ActionTypeService]
})
export class ActionTypeModule {}
