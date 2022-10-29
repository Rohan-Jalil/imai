import { Component, OnInit, Renderer2 } from '@angular/core';
import { Profile } from 'src/app/interfaces/profile';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.scss']
})
export class SearchProfileComponent implements OnInit {
  res!: Profile;
  loading: boolean = false;
  showProfile: boolean = false;
  noData: boolean = false;
  noPost: boolean = true;

  constructor(private profileService: ProfileService, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  getProfileData(name: string) {
    this.loading = true;
    this.profileService.getProfileData(name).subscribe((res: Profile) => {
      if (res) {
        this.res = res;
        const pic = res.profile_image_link.replace(/&amp;/g, '&');
        this.res.profile_image_link = pic;
        if (res.posts) {
          this.noPost = false;
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
  mouseEnter(event: any) {
    this.renderer?.removeClass(event.target?.children[0], 'on-hover');
  }

  mouseLeave(event: any) {
    this.renderer?.addClass(event.target?.children[0], 'on-hover');
  }

}
