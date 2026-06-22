import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDTO, LoginDTO } from './user.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientProxy,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiBody({ type: CreateUserDTO })
  async create_user(@Body() userDto: CreateUserDTO) {
    const result = await firstValueFrom(
      this.userClient.send({ cmd: 'create_user' }, userDto),
    );

    if (result.error) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'Usuário criado com sucesso!',
      data: result,
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Realiza login do usuário' })
  @ApiBody({ type: LoginDTO })
  async login(@Body() loginDto: LoginDTO) {
    const result = await firstValueFrom(
      this.userClient.send({ cmd: 'login' }, loginDto),
    );

    if (result.error) {
      throw new HttpException(result.error, HttpStatus.UNAUTHORIZED);
    }

    return {
      message: 'Login realizado com sucesso!',
      data: result,
    };
  }
}
