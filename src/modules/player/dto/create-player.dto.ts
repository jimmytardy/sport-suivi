import { DefaultValuePipe } from "@nestjs/common";
import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsEmail, IsMongoId, IsOptional, MinLength } from "class-validator";
import { Types } from "mongoose";

export class CreatePlayerDto {
    @MinLength(2)
    firstname: string

    @MinLength(2)
    lastname: string

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    birthday?: Date

    @IsMongoId({each: true})
    @Type(() => Types.ObjectId)
    teamsIds: Types.ObjectId[]

    @IsEmail()
    @IsOptional()
    email?: string
}
