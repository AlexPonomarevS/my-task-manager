import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get('register')
  getRegisterPage(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'front', 'registered.html'));
  }

  @Get('login')
  getLoginPage(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'front', 'login.html'));
  }

  @Get('main')
  getMainPage(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'front', 'main.html'));
  }

  @Get('project')
  getProjectPage(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'front', 'project.html'));
  }
}
