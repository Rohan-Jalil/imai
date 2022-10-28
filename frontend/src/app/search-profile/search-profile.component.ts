import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.scss']
})
export class SearchProfileComponent implements OnInit {
  fullName: string = '';
  userName: string = '';
  totalPosts: number = 0;
  followers: number = 0;
  followings: number = 0;
  profile: string = '';
  biography: string = '';
  externalUrl: string = '';
  res: any = '';
  posts: Array<any> = [];
  isVerified:boolean = false;
  loading:boolean = false;
  showProfile:boolean = false;
  noData:boolean = false;
  noPost:boolean = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  getProfileData(name: string) {
    this.loading = true;
    this.profileService.getProfileData(name).subscribe((res) => {
      if(res){
      this.res = res;  
      this.fullName = res.full_name ? res.full_name : res.profile_name;
      this.userName = res.username ? res.username : res.account;
      this.totalPosts = res.posts_count;
      this.followers = res.followers;
      this.followings = res.following;
      const pic = res.profile_pic_url.replace(/&amp;/g, '&');
      this.profile = pic;
      this.biography = res.biography
      this.externalUrl = res.external_url;
      this.isVerified = res.is_verified;
      if (res.recent_posts) {
        this.posts = res.recent_posts;
      }
      else {
        this.noPost = true;
      }
      this.loading = false;
      this.showProfile = true;
      }
      else {
        this.loading = false;
        this.noData = true;
        this.showProfile = false;
      }
    })
  }

}
