import { Type } from "class-transformer"
import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateActionDto {
    @IsMongoId()
    @Type(() => Types.ObjectId)
    playerId: Types.ObjectId

    @IsMongoId()
    @Type(() => Types.ObjectId)
    actionType: Types.ObjectId

    @IsNumber()
    @IsOptional()
    note: number
}
