import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NewsService {
    private apiKey: string | undefined;
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.apiKey = this.configService.get<string>('newsApi.key');
    }

    async getTopHeadlines() {
        const {data} = await firstValueFrom( await this.httpService.get(`https://newsapi.org/v2/top-headlines?country=us`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': this.configService.get('newsApi.key')
            }
        }));
        return data;
    }

    async getNews() {
        const {data} = await firstValueFrom( await this.httpService.get(`https://newsapi.org/v2/everything?q=tesla`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': this.apiKey
            }
        }));
        return data;
    }
}