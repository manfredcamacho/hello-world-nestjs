import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service';
import { CACHE_MANAGER, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Controller('news')
export class NewsController {
    constructor(
        private readonly newsService: NewsService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}

    @Get()
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(60000)
    @CacheKey('news')
    async getNews() {
        const news = await this.newsService.getNews();
        return news;
    }

    @Get('top-headlines')
    async getTopHeadlines() {
        const cachedNews = await this.cacheManager.get('top-headlines');
        if (!cachedNews) {
            console.log('No cached top-headlines news, fetching from API');
            const news = await this.newsService.getTopHeadlines();
            await this.cacheManager.set('top-headlines', news, 60000); // valido por 1 hora
            return news;
        }
        console.log('Cached top-headlines news found');
        return cachedNews;
    }
}