import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: JwtPayload): Promise<any> {
    let user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }
}
