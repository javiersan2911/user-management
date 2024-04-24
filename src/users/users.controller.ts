import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { CheckPolicies } from 'src/access-control/decorators/check-policies.decorator';
import { RemovePasswordInterceptor } from 'src/interceptors/remove-password/remove-password.interceptor';
import { ReadUserPolicyHandler } from 'src/access-control/handlers/read-user.handler';
import { UpdateUserPolicyHandler } from 'src/access-control/handlers/update-user.handler';
import { DeleteUserPolicyHandler } from 'src/access-control/handlers/delete-user.handler';
import { CreateUserPolicyHandler } from 'src/access-control/handlers/create-user.handler';
import { ReadAllUsersPolicyHandler } from 'src/access-control/handlers/read-all-users.handler';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @CheckPolicies(new CreateUserPolicyHandler())
  @UseInterceptors(RemovePasswordInterceptor)
  async create(@Body() createUserDto: CreateUserDto, @Request() req): Promise<CreateUserResponseDto> {
    const createdUser = await this.usersService.create(createUserDto, req.user?.id);
    return {
      email: createdUser.email,
      name: createdUser.name,
      role: createdUser.role,
      createdDateTime: createdUser.createdDateTime,
      createdBy: createdUser.createdBy,
      lastChangedDateTime: createdUser.lastChangedDateTime,
      lastChangedBy: createdUser.lastChangedBy,
      id: createdUser.id
    }
  }

  @Get()
  @CheckPolicies(new ReadAllUsersPolicyHandler())
  @UseInterceptors(RemovePasswordInterceptor)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @CheckPolicies(new ReadUserPolicyHandler())
  @UseInterceptors(RemovePasswordInterceptor)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @CheckPolicies(new UpdateUserPolicyHandler())
  @UseInterceptors(RemovePasswordInterceptor)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.usersService.update(id, updateUserDto, req.user?.id);
  }

  @Delete(':id')
  @CheckPolicies(new DeleteUserPolicyHandler())
  remove(@Param('id') id: string) {
    this.usersService.remove(id);
  }
}
