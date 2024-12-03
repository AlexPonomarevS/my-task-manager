import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { User } from '../users/aggregates/user.aggregate';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await user.checkPassword(pass))) {
      return user.getPublicProfile();
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserIdFromToken(token: string): Promise<User> {
    try {
      const decodedToken = this.jwtService.verify(token);
      const email = decodedToken.username;
      const user = await this.userService.findByEmail(email);
      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
