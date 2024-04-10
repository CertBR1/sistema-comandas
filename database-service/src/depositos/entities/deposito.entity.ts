import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comanda } from "../../comandas/entities/comanda.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";

@Entity({ name: "depositos" })
export class Deposito {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToOne(() => Comanda)
    @JoinColumn({ name: "comanda_id" })
    comanda: Comanda;
    @Column({ nullable: false })
    valor: number;
    @OneToOne(() => Usuario)
    usuario: Usuario
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}