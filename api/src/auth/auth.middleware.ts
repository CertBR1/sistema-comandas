import { HttpException, Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeStamp } from 'console';
import { NextFunction, Request, Response } from 'express';
import { firstValueFrom, timestamp } from 'rxjs';
import { RmqClientModule } from 'src/rmq-client/rmq-client.module';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: ClientProxy
  ) { }
  async use(req: Request, res: Response, next: NextFunction) {
    Logger.log('Middleware: ', timeStamp());
    try {
      const auth = req.headers.authorization;
      const token = auth.split(' ')[1];
      const responseObsv = this.authService.send('decodeToken', token);
      const response = await firstValueFrom(responseObsv);
      if (!response) {
        throw new HttpException('Usuário não autenticado', 401);
      } else {
        req['authenticated'] = response
        return next();
      }
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        throw new HttpException('Usuário não autenticado', 401);
      }
      throw new HttpException(error, 500);
    }
  }
}
