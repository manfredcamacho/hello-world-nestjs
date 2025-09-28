import { Body, Controller, Post, Headers } from '@nestjs/common';
import { GithubService } from './github.service';
import type { GithubEvent, GithubPayload } from './interfaces/github.interface';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Post()
  webhookHandler(@Body() body: GithubPayload, @Headers('x-github-event') event: GithubEvent) {
    this.githubService.handleWebhook(event, body);
    return {"hola": "mundo"}
  }
}
