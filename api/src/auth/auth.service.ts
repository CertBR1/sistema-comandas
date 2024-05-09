import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_SERVICE')
        private readonly authService: ClientProxy
    ) { }

    getUserInfo(token: any) {
        try {
            return firstValueFrom(this.authService.send('decodeToken', token));
        } catch (error) {
            console.log('=========>', error);
            if (error.message === 'jwt expired') {
                throw new HttpException('Token expirado', HttpStatus.UNAUTHORIZED);
            }
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async validateToken(token: string) {
        try {
            return await firstValueFrom(this.authService.send('validateToken', token));
        } catch (error) {
            console.log(error);
            if (error) {
                return false
            }
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
