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
  async login(data: CreateAuthDto) {
    console.log(data);
    try {
      const responseObsv = this.databaseService.send('findbyUsername', data.username);
      const response = await firstValueFrom(responseObsv);
      console.log(response);
      if (!response) {
        throw new RpcException('Usuário ou senha inválidos');
      }
      const isPasswordValid = await argon.verify(response.senha, data.senha);
      if (!isPasswordValid) {
        throw new RpcException('Usuário ou senha inválidos');
      }
      const payload = { name: response.nome, username: response.username, role: response.nivel_acesso, sub: response.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
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
