import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'

@Schema()
export class ActionType extends Document {
    @Prop({ required: true })
    name: string
    
    @Prop()
    phase: string

    @Prop({ required: true })
    userId: Types.ObjectId
}

export const ActionTypeSchema = SchemaFactory.createForClass(ActionType)
