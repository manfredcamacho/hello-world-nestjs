import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { UserResponseDto } from './dto/user-response.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userModel.find().select('-password').lean();
        return users.map(user => this.mapToResponseDto(user));
    }

    async findOne(id: string): Promise<UserResponseDto> {
        const user = await this.userModel.findOne({ _id: id }).select('-password').lean();
        if (!user) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return this.mapToResponseDto(user);
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({ username }).lean();
    }

    async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const createdUser = new this.userModel(createUserDto);
        const savedUser = await createdUser.save();
        // Excluir password de la respuesta
        const { password, ...userWithoutPassword } = savedUser.toObject();
        return this.mapToResponseDto(userWithoutPassword);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).select('-password').lean();
        if (!user) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return this.mapToResponseDto(user);
    }

    private mapToResponseDto(user: any): UserResponseDto {
        return {
            _id: user._id.toString(),
            name: user.name,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
