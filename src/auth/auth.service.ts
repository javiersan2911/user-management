import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AccessToken } from './types/access-token.type';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(name: string, password: string): Promise<User> {
        const user: User = await this.usersService.findByName(name);
        if (!user) {
            throw new BadRequestException('User not found');
        }
        const isMatch: boolean = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new BadRequestException('Password does not match');
        }
        return user;
    }

    async login(user: User): Promise<AccessToken> {
        const payload = { name: user.name, id: user.id, role: user.role };
        return { access_token: this.jwtService.sign(payload) };
    }

    async register(user: CreateUserDto): Promise<AccessToken> {
        return this.login(await this.usersService.create(user, null));
    }
}
