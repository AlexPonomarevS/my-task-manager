import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
}
