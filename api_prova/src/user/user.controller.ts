import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDTO, LoginDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private userClient: ClientProxy) {}

  @Post('create')
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

  @Get()
  async get_all_users() {
    const result = await firstValueFrom(
      this.userClient.send({ cmd: 'get_all_users' }, {}),
    );

    return {
      data: result,
    };
  }

  @Get(':matricula')
  async get_user(@Param('matricula') matricula: string) {
    const result = await firstValueFrom(
      this.userClient.send({ cmd: 'get_user' }, matricula),
    );

    if (result.error) {
      throw new HttpException(result.error, HttpStatus.NOT_FOUND);
    }

    return {
      data: result,
    };
  }

  @Post('login')
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
