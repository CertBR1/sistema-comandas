import { Body, Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }
    @Post('validateToken')
    validateToken(@Req() req) {
        try {
            const { token } = req.body
            return this.authService.validateToken(token);
        } catch (error) {
            console.log(error);
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('getUserInfo')
    getUserInfo(@Req() req) {
        try {
            const { token } = req.body
            if (!token) {
                throw new HttpException('Token não informado', HttpStatus.BAD_REQUEST);
            }
            return this.authService.getUserInfo(token);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
