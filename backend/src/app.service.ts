import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { InstagramProfileDTO } from './dto/instagramProfileDTO';
import { ScrapeProfileDTO } from './dto/scrapProfileDTO';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async scrapeProfile(payload: ScrapeProfileDTO): Promise<InstagramProfileDTO> {
    const responseId = await this.getResponseId(payload.instagramHandle);

    await this.sleep(5000);

    return await this.getProfile(responseId);
  }

  async getResponseId(instagramHandle: string): Promise<string> {
    const instagramScraperUrl = this.configService.get('DATA_SCRAPPER_URL');
    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${this.configService.get('ACCESS_TOKEN')}`,
    };
    try {
      const data = (
        await lastValueFrom(
          this.httpService.post(
            instagramScraperUrl,
            {
              account: instagramHandle.trim(),
              scraper: 'instagramProfile',
            },
            {
              headers: requestHeaders,
            },
          ),
        )
      ).data;
      return data?.responseId;
    } catch (error) {
      this.logger.error(
        `An exception has occurred while retrieving data for the instagramHandle: ${instagramHandle}`,
        error,
      );
    }
  }

  async getProfile(responseId: string): Promise<InstagramProfileDTO> {
    const instagramScraperResponseUrl = this.configService.get(
      'DATA_SCRAPPER_RESPONSE_URL',
    );
    const requestHeaders = {
      Authorization: `Basic ${this.configService.get('ACCESS_TOKEN')}`,
    };

    const finalUrl = new URL(instagramScraperResponseUrl);
    finalUrl.searchParams.append('responseId', responseId);
    finalUrl.searchParams.append('scraper', 'instagramProfile');

    try {
      const data = (
        await lastValueFrom(
          this.httpService.get(finalUrl.toString(), {
            headers: requestHeaders,
          }),
        )
      ).data;
      return data[0];
    } catch (error) {
      console.log(error);
      this.logger.error(
        `An exception has occurred while retrieving data for the against responsesId: ${responseId}`,
        error,
      );
    }
  }

  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
