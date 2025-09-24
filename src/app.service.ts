import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {

  constructor(private readonly httpService: HttpService) {
  }

  async getPokemonByName(name: string) {
    const {data} = await firstValueFrom( await this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`));
    return data;
  }
}
