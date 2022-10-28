export class InstagramProfileDTO {
  id: string;
  username: string;
  fbid: string;
  connected_fb_page: string;
  profile_pic_url: string;
  full_name: string;
  biography: string;
  external_url: string;
  is_verified: boolean;
  is_private: boolean;
  category_name: string;
  category_enum: string;
  is_joined_recently: boolean;
  highlight_reel_count: number;
  has_ar_effects: boolean;
  has_clips: boolean;
  has_guides: boolean;
  has_channel: boolean;
  is_business_account: boolean;
  business_address_json: string;
  business_contact_method: string;
  business_email: string;
  business_phone_number: string;
  followers: number;
  posts_count: number;
  following: number;
}
