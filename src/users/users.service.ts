import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto, loggedInUserId?: string): Promise<User> {
    const existingUser = await this.findByName(createUserDto.name);
    if (existingUser) {
      throw new BadRequestException('user already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
      role: createUserDto.role,
      createdBy: loggedInUserId,
      lastChangedBy: loggedInUserId,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      }
    })

    if (!user){
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByName(name: string) {
    return await this.userRepository.findOne({
      where: {
        name: name
      },
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto, loggedInUserId: string): Promise<User> {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    const user = this.userRepository.create({
      id: id,
      email: updateUserDto.email,
      name: updateUserDto.name,
      password: updateUserDto.password,
      lastChangedBy: loggedInUserId,
    });

    return await this.userRepository.save(user);
  }

  remove(id: string) {
    this.userRepository.delete(id)
  }
}
