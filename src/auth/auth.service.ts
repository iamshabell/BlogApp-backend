import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService
    ){
        
    }

    async validateUser(email: string, password: string){
        const user = await this.usersService.findByEmail(email)
        
        if(!user || user.password !== password) return false;
        return user
    }

    registerUser(createUserDto: CreateUserDto){}
}
