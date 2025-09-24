import { Controller, Get, Param, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}
    
    @Get()
    getUsers() {
        return this.usersService.findAll();
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}
