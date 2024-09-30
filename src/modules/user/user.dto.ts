import {
    IsBoolean,
    IsDefined,
    IsString,
} from 'class-validator'
import { Types } from 'mongoose'


export class CreateUserDTO {
    @IsString()
    firstname: string

    @IsString()
    lastname: string

    @IsString()
    email: string

    @IsString()
    password: string
}


export class ProfileUpdateDTO {
    @IsDefined()
    @IsBoolean()
    active: boolean
}
