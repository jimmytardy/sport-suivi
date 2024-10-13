import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'

@Schema()
export class Game extends Document {
    @Prop({ required: true })
    name: string

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Team' })
    teamId: Types.ObjectId

    @Prop()
    video: string

    @Prop({ type: Date })
    date: Date

    @Prop({ required: true })
    userId: Types.ObjectId
}

export const GameSchema = SchemaFactory.createForClass(Game)
