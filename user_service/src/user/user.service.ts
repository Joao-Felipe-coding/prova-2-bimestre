import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDTO, LoginDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private user: typeof User) {}

  async create_user(data: CreateUserDTO) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.senha, salt);

    return this.user.create({
      nome: data.nome,
      cpf: data.cpf,
      telefone: data.telefone,
      matricula: data.matricula,
      senha: hash,
    });
  }

  async login(data: LoginDTO) {
    const user = await this.user.findOne({
      where: { matricula: data.matricula },
    });

    if (!user) {
      return { error: 'Matrícula não encontrada' };
    }

    const senhaValida = await bcrypt.compare(data.senha, user.senha);

    if (!senhaValida) {
      return { error: 'Senha inválida' };
    }

    return {
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
      telefone: user.telefone,
      matricula: user.matricula,
    };
  }
}
