import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService implements OnModuleInit {

    private userService: UsersService;
    constructor(
        private moduleRef: ModuleRef,
        private jwtService: JwtService
    ){
        
    }
    onModuleInit() {
        this.userService = this.moduleRef.get(UsersService, {strict: false})
    }
    
 
    async validateUser(email: string, password: string){
        const user = await this.userService.findByEmail(email)
        
        if(!user || user.password!== password) return false;
        return user
    }

    sign(user: User){
        const accessToken = this.jwtService.sign({sub: user.id,email: user.email})
        return {
            id: user.id,
            access_token: accessToken
        }
    }

    async registerUser(createUserDto: CreateUserDto){

        const newUser = await this.userService.create(createUserDto)
        return this.sign(newUser)
    }
}
