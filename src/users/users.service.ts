import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor (
    private prismaService: PrismaService
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({data: createUserDto})
  }

  findAll(query: Prisma.UserInclude) {
    return this.prismaService.user.findMany({ include: query });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({where: {email: email}})
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({where: {id: id}})
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({data: updateUserDto, where: {id:id}})
  }

  remove(id: string) {
    return this.prismaService.user.delete({where: {id: id}})
  }
}
