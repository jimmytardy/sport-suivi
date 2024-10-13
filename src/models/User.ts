import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>
@Schema({
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    minimize: false,
})
export class User {
    _id: Types.ObjectId

    @Prop({ required: true })
    name: string

    @Prop({ unique: true, require: true, index: true })
    email: string

    @Prop({ required: true, select: false })
    password: string;

    @Prop({ required: false })
    picture: string;

    @Prop({ required: true, select: false, index: true, unique: true })
    externalId: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
