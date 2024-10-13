import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class Player extends Document {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ type: Date })
  birthday: Date;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Team' }], default: [] })
  teamsIds: Types.ObjectId[];
  
  @Prop()
  email: string;

  @Prop()
  picture: string;

  @Prop({ required: true })
  userId: Types.ObjectId
}

export const PlayerSchema = SchemaFactory.createForClass(Player);