import { Type } from "class-transformer"
import { IsMongoId, IsNumber, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateSituationDto {
    @IsString()
    name: string

    @IsNumber()
    time: number // durée en seconde

    @IsMongoId()
    @Type(() => Types.ObjectId)
    gameId: Types.ObjectId
}
