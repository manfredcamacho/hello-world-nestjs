import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    
    constructor(private authService: AuthService){
        super({usernameField: 'userMyLogin', passwordField: 'passMyLogin'}) // aca va el nombre del CAMPO que contiene el valor con el que se va a loguear el usuario, por defecto es username y password
        
    }
    
    
    validate(username: string, password: string): Promise<any> {
        const validatedUser = this.authService.validateUser(username, password);

        if (!validatedUser)
            throw new Error("Method not implemented.");

        return validatedUser; // Passport guarda la informacion que devuelve la funcion validate del usuario en el req.user

    }
    
}