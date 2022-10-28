import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ProfileResponseDTO } from './dto/profileResponseDTO';
import { ScrapeProfileDTO } from './dto/scrapProfileDTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/scrape')
  async scrapeProfile(
    @Body() scrapeProfilePayload: ScrapeProfileDTO,
  ): Promise<ProfileResponseDTO> {
    return this.appService.scrapeProfile(scrapeProfilePayload);
  }
}
