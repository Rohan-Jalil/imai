import { Thumbnail } from './instagramProfileDTO';

export class ProfileResponseDTO {
  constructor(
    account: string,
    profile_name: string,
    profile_image_link: string,
    biography: string,
    external_url: string,
    following: number,
    posts_count: number,
    followers: number,
    is_verified: boolean,
    posts: Post[],
  ) {
    this.account = account;
    this.profile_name = profile_name;
    this.profile_image_link = profile_image_link;
    this.biography = biography;
    this.external_url = external_url;
    this.following = following;
    this.followers = followers;
    this.posts_count = posts_count;
    this.is_verified = is_verified;
    this.posts = posts || [];
  }
  account: string;
  profile_name: string;
  profile_image_link: string;
  biography: string;
  business_email: string;
  external_url: string;
  following: number;
  posts_count: number;
  followers: number;
  is_verified: boolean;
  posts: Post[];
}

export class Post {
  constructor(
    id: string,
    caption: string,
    likes: number,
    media_type: string,
    image_url: string,
    url: string,
    comments: number,
    datetime: string,
    thumbnail_src: string,
    thumbnails: Thumbnail[],
    video_url?: string,
    video_view_count?: number,
  ) {
    this.id = id;
    this.caption = caption;
    this.likes = likes;
    this.media_type = media_type;
    this.image_url = image_url;
    this.url = url;
    this.comments = comments;
    this.datetime = datetime;
    this.thumbnail_src = thumbnail_src;
    this.thumbnails = thumbnails;
    this.video_url = video_url;
    this.video_view_count = video_view_count;
  }
  id: string;
  caption: string;
  likes: number;
  video_view_count?: number;
  media_type: string;
  image_url: string;
  video_url?: string;
  url: string;
  comments: number;
  datetime: string;
  thumbnail_src: string;
  thumbnails: Thumbnail[];
}
