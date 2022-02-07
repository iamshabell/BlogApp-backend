import { Controller, Request, Body, Post, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ProfileMe } from './guards/profile.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Request() req){
        return this.authService.sign(req.user)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    profile(@ProfileMe() profileMe){
        return profileMe
    }
    
    @Post('register')
    register(@Body() createUserDto: CreateUserDto){
        return this.authService.registerUser(createUserDto)
    }
}
