import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InstagramProfileDTO } from './dto/instagramProfileDTO';
import { ScrapeProfileDTO } from './dto/scrapProfileDTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/scrape')
  async scrapeProfile(
    @Body() scrapeProfilePayload: ScrapeProfileDTO,
  ): Promise<InstagramProfileDTO> {
    console.log('console', scrapeProfilePayload);
    return this.appService.scrapeProfile(scrapeProfilePayload);
  }
}
