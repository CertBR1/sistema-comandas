declare class Credenciais {
    username: string;
    senha: string;
}
export declare class CreateAuthDto {
    credenciaisDigitadas: Credenciais;
    credenciaisBancoDeDados: Credenciais;
}
export {};
