import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/types/User";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService{
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ){}

    async validateUser(username: string, password: string): Promise<any>{
        const user = await this.usersService.findByUsername(username);
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return { id: (user as any)._id, name: user.name };
            }
        }
        return null;
    }

    async login(user: User){
        const payload = {
            name:  user.name,
            sub: user._id
        };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}