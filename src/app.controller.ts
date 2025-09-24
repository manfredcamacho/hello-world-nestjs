import { Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('pokemon/:name')
  getPokemon(@Param('name') name: string) {
    return this.appService.getPokemonByName(name);
  }

  @Get('pokemon/compare/:firstPokemonName/:secondPokemonName')
  async comparePokemon(@Param('firstPokemonName') firstPokemonName: string, @Param('secondPokemonName') secondPokemonName: string): Promise<any> {
    const firstPokemon = await this.appService.getPokemonByName(firstPokemonName)
    const secondPokemon = await this.appService.getPokemonByName(secondPokemonName)

    //hacer cositas
    let higherHP = firstPokemon.stats[0].base_stat >= secondPokemon.stats[0].base_stat ? firstPokemon.name : secondPokemon.name
    let higherAttack = firstPokemon.stats[1].base_stat >= secondPokemon.stats[1].base_stat ? firstPokemon.name : secondPokemon.name
    let higherDefense = firstPokemon.stats[2].base_stat >= secondPokemon.stats[2].base_stat ? firstPokemon.name : secondPokemon.name

    return {
      higherHP,
      higherAttack,
      higherDefense
    }


  }
}
