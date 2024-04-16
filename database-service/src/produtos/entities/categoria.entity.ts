import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "./produto.entity";

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    descricao: string;

    @OneToOne(() => Produto, (produto) => produto.categoria)
    produtos: Produto

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;
}