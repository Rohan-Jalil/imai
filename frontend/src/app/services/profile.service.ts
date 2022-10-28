import { HttpClient } from  '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Profile } from '../interfaces/profile';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    basicPath = environment.path;
    constructor(private http: HttpClient) { }
    getProfileData(name: string): Observable<Profile> {
        return this.http.post<Profile>(`${this.basicPath}/scrape`, {'instagramHandle': name});
    }
}