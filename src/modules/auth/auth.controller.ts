import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
    Req,
    Request,
    UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from 'src/guards/local-auth.guard'
import { CreateUserDTO } from '../user/user.dto'
import { UserService } from '../user/user.service'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'
import { ConnectInDTO } from './auth.dto'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }
    
    @Post('signup')
    async signUp(@Body() createUserDTO: CreateUserDTO) {
        try {
            const user = await this.userService.create(createUserDTO);
            return {
              ...this.authService.login(user),
              message: 'Utilisateur crée avec succès.'
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('connect-in')
    @UseGuards(JwtAuthGuard)
    async connectIn(@Req() req, @Body() body: ConnectInDTO) {
        if (!req.user.isAdmin) throw new HttpException('Vous n\'avez pas les droits pour accéder à cette ressource', 403);
        return this.authService.connectIn(body.userId);
    }
}
