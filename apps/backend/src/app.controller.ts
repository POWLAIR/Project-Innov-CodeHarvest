import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GithubService } from './github/github.service';  // Importer le service Github

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly githubService: GithubService,  // Injecter le service Github
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
