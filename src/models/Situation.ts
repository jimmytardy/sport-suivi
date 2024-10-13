import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'

@Schema()
export class Situation extends Document {
    @Prop({ required: true })
    name: string

    @Prop()
    time: number // durée en seconde

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Game'})
    gameId: Types.ObjectId

    @Prop({ required: true })
    userId: Types.ObjectId
}

export const SituationSchema = SchemaFactory.createForClass(Situation)
