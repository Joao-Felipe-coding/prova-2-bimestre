import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDTO, LoginDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  create_user(data: CreateUserDTO) {
    return this.userService.create_user(data);
  }

  @MessagePattern({ cmd: 'login' })
  login(data: LoginDTO) {
    return this.userService.login(data);
  }

  @MessagePattern({ cmd: 'get_user' })
  get_user(matricula: string) {
    return this.userService.get_user(matricula);
  }

  @MessagePattern({ cmd: 'get_all_users' })
  get_all_users() {
    return this.userService.get_all_users();
  }
}
