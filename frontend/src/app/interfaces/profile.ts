export interface Profile {
    profile_name: string;
    account: string;
    posts_count: number;
    followers: number;
    following: number;
    profile_image_link: string;
    biography: string;
    external_url: string;
    is_verified: boolean;
    posts: any;
}