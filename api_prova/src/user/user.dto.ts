import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  nome!: string;

  @ApiProperty()
  cpf!: string;

  @ApiProperty()
  telefone!: string;

  @ApiProperty()
  matricula!: string;

  @ApiProperty()
  senha!: string;
}

export class LoginDTO {
  @ApiProperty()
  matricula!: string;

  @ApiProperty()
  senha!: string;
}
