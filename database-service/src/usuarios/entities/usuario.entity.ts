import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Credencial } from "./credencial.entity";
import { Deposito } from "src/depositos/entities/deposito.entity";

@Entity({ name: 'usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 100, nullable: false })
    nome: string;
    @Column({ length: 100, nullable: false })
    sobrenome: string;
    @OneToOne(() => Credencial)
    @JoinColumn({ name: 'id_credencial' })
    credenciais: Credencial
    @OneToMany(() => Deposito, deposito => deposito.usuario)
    depositos: Deposito[]
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
