export class Thumbnail {
  src: string;
  config_width: number;
  config_height: number;
}

export class InstagramProfileDTO {
  account: string;
  caption: string;
  profile_name: string;
  profile_image_link: string;
  profile_pic_url?: string;
  full_name?: string;
  biography: string;
  id: string;
  business_email?: any;
  external_url: string;
  following: number;
  likes: number;
  media_type: string;
  posts_count: number;
  followers: number;
  is_verified: boolean;
  datetime: any;
  image_url: string;
  url: string;
  comments: number;
  thumbnail_src: string;
  thumbnails: Thumbnail[];
  video_view_count?: number;
  video_url: string;
  is_private?: boolean;
}
