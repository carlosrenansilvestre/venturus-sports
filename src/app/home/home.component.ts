import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { forkJoin, Subscription } from 'rxjs';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    HomeService
  ]
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  public users: User[] = [];
  public userListFilter: string = "";
  public insertNewUserSubscription = new Subscription;

  ngOnInit() {
    this.getUsers();

    this.insertNewUserSubscription = this.homeService.insertNewUser.subscribe(obj => {
      obj.posts = [];
      obj.albums = [];
      obj.photos = [];
      obj.address.city = obj.city;
      this.users.push(obj);
    });
  }

  getUsers() {
    this.homeService.getUsers().subscribe(
      result => {
        console.log("Usuários", result);
        this.getUserInfos(result);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  ngOnDestroy() {
    this.insertNewUserSubscription.unsubscribe();
  }

  removeUser(user) {
    console.log("User removed", user.username);
  }

  async getUserInfos(users) {
    let posts = this.homeService.getPosts();
    let albums = this.homeService.getAlbums();
    let photos = this.homeService.getPhotos();
    let dados = await forkJoin([posts, albums, photos]).toPromise();

    users.forEach(user => {
      user.posts = [];
      user.albums = [];
      user.photos = [];

      dados[0].forEach(post => {
        if (user.id == post.userId) {
          user.posts.push(post);
        }
      });

      dados[1].forEach(album => {
        if (user.id == album.userId) {
          user.albums.push(album);
        }

        dados[2].forEach(photo => {
          if (photo.albumId == album.id) {
            user.photos.push(photo);
          }
        });
      });
    });

    this.users = users;
  }
}
