declare class Credenciais {
    username: string;
    senha: string;
}
export declare class CreateUsuarioDto {
    nome: string;
    sobrenome: string;
    credenciais: Credenciais;
}
export {};
