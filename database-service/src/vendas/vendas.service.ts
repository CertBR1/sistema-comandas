import { Injectable } from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { Venda } from './entities/venda.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comanda } from 'src/comandas/entities/comanda.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { VendaProduto } from 'src/vendas-produtos/entities/vendas-produto.entity';
import { RpcException } from '@nestjs/microservices';
import { Produto } from 'src/produtos/entities/produto.entity';

@Injectable()
export class VendasService {
  constructor(
    @InjectRepository(Venda)
    private readonly vendasRepository: Repository<Venda>,
    @InjectRepository(Comanda)
    private readonly comandasRepository: Repository<Comanda>,
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    @InjectRepository(VendaProduto)
    private readonly vendasProdutosRepository: Repository<VendaProduto>,
    @InjectRepository(Produto)
    private readonly produtosRepository: Repository<Produto>,
  ) { }
  async create(createVendaDto: CreateVendaDto) {
    try {
      const comanda = await this.comandasRepository.findOneBy({ id: createVendaDto.comandaId });
      const usuario = await this.usuariosRepository.findOneBy({ id: createVendaDto.usuarioId });
      const venda = await this.vendasRepository.create(
        {
          comanda: comanda,
          usuario: usuario,
          valor_total: createVendaDto.valor_total,
        }
      );
      const vendaSalva = await this.vendasRepository.save(venda);
      for (const produto of createVendaDto.produtos) {
        const vendasProdutos = await this.vendasProdutosRepository.create(
          {
            venda: vendaSalva,
            produto: await this.produtosRepository.findOne({ where: { id: Number(produto.id) } },),
            quantidade: Number(produto.quantidade)
          }
        );
        await this.vendasProdutosRepository.save(vendasProdutos);
      }
      return vendaSalva
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new RpcException('Venda ja existe');
      }
      throw new RpcException(error);
    }
  }

  findAll() {
    return `This action returns all vendas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venda`;
  }

  update(id: number, updateVendaDto: UpdateVendaDto) {
    return `This action updates a #${id} venda`;
  }

  remove(id: number) {
    return `This action removes a #${id} venda`;
  }
}
