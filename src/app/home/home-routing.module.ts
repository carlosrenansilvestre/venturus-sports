import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//app Component
import { HomeComponent } from "./home.component";
import { NewUserComponent } from "./new-user/new-user.component";

const HomeRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: 'registration',
    component: NewUserComponent
  }
];

RouterModule.forRoot(HomeRoutes, { scrollPositionRestoration: 'enabled' });

@NgModule({
  imports: [RouterModule.forChild(HomeRoutes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
