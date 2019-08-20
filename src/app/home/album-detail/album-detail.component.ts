import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Album } from '../../shared/models/album.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {

  constructor(private homeService: HomeService, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((e: any) => {
      let userId = this.route.snapshot.paramMap.get("userId").toString();
      if (e instanceof NavigationEnd) {
        this.getAlbumBUserId(userId);
      }
    });
  }

  public albums: Album[] = [];

  ngOnInit() {
  }

  getAlbumBUserId(userId) {
    this.homeService.getAlbumByUserId(userId).subscribe(
      result => {
        this.albums = result;
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  getAlbumPhotos(album) {
    if (album.photos) {
      album.photos = null;
      return;
    } else {

      this.homeService.getAlbumPhotos(album.id).subscribe(
        result => {
          album.photos = result;
          console.log("Photos", result);

        },
        error => {
          console.log("Error", error);
        }
      );
    }
  }
}
