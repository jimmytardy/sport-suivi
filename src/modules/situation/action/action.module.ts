import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Action, ActionSchema } from 'src/models/Action';
import { ActionService } from './Action.service';
import { ActionTypeModule } from './action-type/action-type.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Action.name, schema: ActionSchema }]), ActionTypeModule],
  controllers: [ActionController],
  providers: [ActionService],
  exports: [ActionService]
})
export class ActionModule {}
