import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { MinLength } from 'class-validator';
import { Document, Types } from 'mongoose';

@Schema()
export class Team extends Document {
  @MinLength(3)
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, default: '' })
  description: string;
  
  @MinLength(3)
  @Prop({ required: true })
  sport: string;

  @Prop({ required: true })
  userId: Types.ObjectId
}

export const TeamSchema = SchemaFactory.createForClass(Team);