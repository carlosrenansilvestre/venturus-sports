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
import { Subject, Observable, of } from "rxjs";

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

  getAlbumByUserId(userId) {
    return this.http.get<Album[]>(this.apiBaseUrl + "albums?userId=" + userId).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  getAlbumPhotos(albumId) {
    return this.http.get<Photo[]>(this.apiBaseUrl + "photos?albumId=" + albumId).pipe(
      map(response => {
        return response;
      }),
      catchError((error: any) => throwError(error))
    );
  }

  getDaysOfWeek(): Observable<any> {
    let daysofweek =
      [
        {
          "userId": 1,
          "id": 1,
          "days": [
            { name: 'Sun', id: 1 },
            { name: 'Mon', id: 2 },
            { name: 'Tue', id: 3 },
          ]
        },
        {
          "userId": 2,
          "id": 2,
          "days": [
            { name: 'Sun', id: 1 },
            { name: 'Mon', id: 2 },
            { name: 'Tue', id: 3 },
            { name: 'Wed', id: 4 },
            { name: 'Thu', id: 5 },
            { name: 'Fri', id: 6 },
            { name: 'Sat', id: 7 }
          ]
        },
        {
          "userId": 3,
          "id": 3,
          "days": [
            { name: 'Sun', id: 1 },
            { name: 'Mon', id: 2 },
            { name: 'Tue', id: 3 },
            { name: 'Fri', id: 6 }
          ]
        },
        {
          "userId": 4,
          "id": 4,
          "days": [
            { name: 'Sun', id: 1 },
            { name: 'Tue', id: 3 },
            { name: 'Thu', id: 5 },
            { name: 'Fri', id: 6 }
          ]
        },
        {
          "userId": 5,
          "id": 5,
          "days": [
            { name: 'Sun', id: 1 },
            { name: 'Mon', id: 2 },
            { name: 'Tue', id: 3 },
            { name: 'Wed', id: 4 },
            { name: 'Thu', id: 5 }
          ]
        },
      ]

    return of(daysofweek);
  }

}
