import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const niveisDeAcesso = this.reflector.get<number[]>('nivelAcesso', context.getHandler());
    if (!niveisDeAcesso) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.authenticated;
    return niveisDeAcesso.includes(user.nivel_acesso);
  }
}
