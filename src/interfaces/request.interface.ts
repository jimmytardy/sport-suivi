import { Request } from "@nestjs/common";
import { User } from "src/models/User";


export interface IRequestConnected extends Request {
    user: User
} 