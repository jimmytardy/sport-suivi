import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class CreateTeamDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsString()
    @Transform(({ value }) => value?.toLowerCase())
    sport: string;
}
