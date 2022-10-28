import { IsNotEmpty } from 'class-validator';

export class ScrapeProfileDTO {
  @IsNotEmpty()
  instagramHandle: string;
}
