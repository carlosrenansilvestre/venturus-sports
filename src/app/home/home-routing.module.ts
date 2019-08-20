import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//app Component
import { HomeComponent } from "./home.component";
import { AlbumDetailComponent } from "./album-detail/album-detail.component";

const HomeRoutes: Routes = [
  {
    path: "",
    component: HomeComponent, 
    data: { bc: 'Users' }
  },
  {
    path: 'album/:userId',
    component: AlbumDetailComponent, 
    data: { bc: 'Album Detail' }
  }
];

RouterModule.forRoot(HomeRoutes, { scrollPositionRestoration: 'enabled' });

@NgModule({
  imports: [RouterModule.forChild(HomeRoutes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
