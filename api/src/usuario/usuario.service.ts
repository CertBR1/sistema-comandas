import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, } from 'rxjs';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('DATABASE_SERVICE')
    private readonly databaseService: ClientProxy,
    @Inject('AUTH_SERVICE')
    private readonly authService: ClientProxy
  ) { }
  async login(credenciais: LoginDto) {
    try {
      const responseObsv = this.authService.send('login', credenciais);
      const response = await firstValueFrom(responseObsv);
      return response
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }
  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      console.log(createUsuarioDto)
      const responseObsv = this.databaseService.send('createUsuario', createUsuarioDto);
      const response = await firstValueFrom(responseObsv);
      console.log(response)
      return response
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  findAll() {
    return `This action returns all usuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
