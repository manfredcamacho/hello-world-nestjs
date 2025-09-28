import { Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Pokemon')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('pokemon/:name')
  @ApiResponse({ status: 200, description: 'Pokemon found' })
  @ApiResponse({ status: 404, description: 'Pokemon not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
