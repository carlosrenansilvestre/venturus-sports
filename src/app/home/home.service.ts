import { throwError } from "rxjs/internal/observable/throwError";
import { Injectable, ErrorHandler } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";
import { User } from '../shared/models/user.model';
import { Post } from '../shared/models/post.model';
import { Album } from '../shared/models/album.model';
import { Photo } from '../shared/models/photo.model';
import { Subject } from "rxjs";

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) { }

  private apiBaseUrl = environment.API_URL;

  public insertNewUser: Subject<any> = new Subject<any>();

  getUsers() {
    return this.http.get<User[]>(this.apiBaseUrl + "users").pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  getPosts() {
    return this.http.get<Post[]>(this.apiBaseUrl + "posts").pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  getAlbums() {
    return this.http.get<Album[]>(this.apiBaseUrl + "albums").pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  getPhotos() {
    return this.http.get<Photo[]>(this.apiBaseUrl + "photos").pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

}
