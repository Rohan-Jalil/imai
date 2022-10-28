export interface Profile {
    full_name?: string;
    profile_name?: string;
    username?: string;
    account: string;
    posts_count: number;
    followers: number;
    following: number;
    profile_pic_url: string;
    biography: string;
    external_url: string;
    is_verified: boolean;
    recent_posts?: any;
}