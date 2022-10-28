import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { InstagramProfileDTO } from './dto/instagramProfileDTO';
import { ProfileResponseDTO, Post } from './dto/profileResponseDTO';
import { ScrapeProfileDTO } from './dto/scrapProfileDTO';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async scrapeProfile(payload: ScrapeProfileDTO): Promise<ProfileResponseDTO> {
    const responseId = await this.getResponseId(payload.instagramHandle);

    // Sleep for 5 seconds
    await this.sleep(5000);

    let profile = (await this.getProfile(responseId)) as any;

    let attempts = 1;

    // If status is still pending then await for 5 seconds and try again
    while (profile?.status === 'pending') {
      attempts++;
      await this.sleep(5000);
      this.logger.log(`Attempts #: ${attempts}`);
      profile = await this.getProfile(responseId);
    }

    return this.parseResponse(profile);
  }

  parseResponse(data: InstagramProfileDTO[]): ProfileResponseDTO {
    if (data.length) {
      const posts: Post[] = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const post = new Post(
          element.id,
          element.caption,
          element.likes,
          element.media_type,
          element.image_url,
          element.url,
          element.comments,
          element.datetime,
          element.thumbnail_src,
          element.thumbnails,
          element.video_url || null,
          element.video_view_count || 0,
        );
        posts.push(post);
      }
      const response = new ProfileResponseDTO(
        data[0].account,
        data[0].profile_name,
        data[0].profile_image_link,
        data[0].biography,
        data[0].external_url,
        data[0].following,
        data[0].posts_count,
        data[0].followers,
        data[0].is_verified,
        posts,
      );
      return response;
    }
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

  async getProfile(responseId: string): Promise<InstagramProfileDTO[]> {
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
      return data;
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
