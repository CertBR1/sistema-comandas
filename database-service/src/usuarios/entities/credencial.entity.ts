import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity({ name: 'credenciais' })
export class Credencial {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 150, unique: true })
    username: string;
    @Column({ length: 150 })
    password: string;
    @Column({ length: 11, unique: true })
    telefone: string;
    @OneToOne(() => Usuario, (usuario) => usuario.credenciais)
    usuario: Usuario;
    @Column({ default: 0 })
    nivel_acesso: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}