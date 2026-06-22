export class CreateUserDTO {
  nome!: string;
  cpf!: string;
  telefone!: string;
  matricula!: string;
  senha!: string;
}

export class LoginDTO {
  matricula!: string;
  senha!: string;
}
