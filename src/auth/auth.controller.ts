import { Controller, Request, Post, UseGuards, Get } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller()
export class AuthController{
    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard) // Primero pasa por este middleware antes de ir al controller, si falla algo aca, no avanza al controller
    @Post("auth/login")
    login(@Request() req){
        //si entro aca, es poque el middleware valido al usuario

        return this.authService.login(req.user) // req.user contiene la informacion del usuario que devuelve la funcion validate del usuario en el local.strategy
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }
}