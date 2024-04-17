import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    @Inject('DATABASE_SERVICE')
    private readonly databaseService: ClientProxy,
    private readonly jwtService: JwtService
  ) {

  }
  async login(data: any) {
    try {
      const { credenciais, user } = data;
      console.log("Credenciais", credenciais, "user", user);
      const validateCredenciais = await argon.verify(user.senha, credenciais.senha);
      if (!validateCredenciais) {
        throw new RpcException('Credenciais inválidas');
      }
      const payload = { name: `${user.usuario.nome} ${user.usuario.sobrenome}`, username: user.username, sub: user.usuario.id, nivel_acesso: user.nivel_acesso };
      const token = await this.jwtService.sign(payload);
      return { token };
    } catch (error) {
      console.log(error)
      throw new RpcException(error);
    }
  }
  async decodeToken(data: string) {
    try {
      const validateToken = this.jwtService.verify(data);
      if (!validateToken) {
        throw new RpcException('Token inválido');
      }
      const payload = await this.jwtService.decode(data);
      return payload
    } catch (error) {
      console.log(error)
      throw new RpcException(error);
    }
  }
}
