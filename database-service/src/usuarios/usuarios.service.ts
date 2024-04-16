import { Injectable, Logger } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { Credencial } from './entities/credencial.entity';
import { RpcException } from '@nestjs/microservices';
import * as argon from 'argon2';
@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    @InjectRepository(Credencial)
    private readonly credenciaisRepository: Repository<Credencial>,
  ) { }
  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { nome, sobrenome, credenciais } = createUsuarioDto;
      const senhaHash = await argon.hash(credenciais.senha);
      const usuario = this.usuariosRepository.create({ nome, sobrenome });
      const credencial = this.credenciaisRepository.create({ username: credenciais.username, senha: senhaHash, usuario });
      const createdCredencial = await this.credenciaisRepository.save(credencial);
      usuario.credenciais = createdCredencial
      const createdUsuario = await this.usuariosRepository.save(usuario);
      return { ...createdUsuario, credenciais: createdCredencial };
    } catch (error) {
      Logger.error(error)
      console.log(error)
      throw new RpcException(error);
    }
  }

  findAll() {
    throw new RpcException('Method not implemented.');
  }

  async findbyUsername(username: string) {
    console.log(username);
    const user = await this.credenciaisRepository.findOne({ where: { username }, relations: { usuario: true } });
    console.log(user);
    return user;
  }

  findOne(id: number) {
    try {
      return this.usuariosRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    throw new RpcException('Update not implemented');
  }

  remove(id: number) {
    throw new RpcException(`Delete not implemented`);
  }
}
