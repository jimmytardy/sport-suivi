import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class CreateActionTypeDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.toUpperCase())
    phase: string
}
