import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {

  constructor(private readonly httpService: HttpService) {
  }

  async getPokemonByName(name: string) {
    try {
      const {data} = await firstValueFrom(this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`));
      return data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException(`Pokemon ${name} not found`);
      }
      throw new Error(`Error fetching pokemon: ${error.message}`);
    }
  }
}
