import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Role } from './enums/role.enum';
import { SignInDto } from './dto/sign-in.dto';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    async login(@Body() user: { username: string, password: string }) {
        return this.authService.login(await this.authService.validateUser(user.username, user.password));
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @Post('register')
    register(@Body() signInDto: SignInDto) {
        return this.authService.register({ ...signInDto, role: Role.USER });
    }
}
