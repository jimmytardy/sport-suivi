import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'

@Schema()
export class Action extends Document {
    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Player' })
    playerId: Types.ObjectId

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'ActionType'  })
    actionType: Types.ObjectId

    @Prop()
    note: number

    @Prop({ required: true })
    userId: Types.ObjectId
}

export const ActionSchema = SchemaFactory.createForClass(Action)
