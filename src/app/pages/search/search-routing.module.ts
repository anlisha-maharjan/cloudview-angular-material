import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchComponent } from "./search.component";

const routes: Routes = [
  {
    path: "",
    component: SearchComponent,
  },
  {
    path: "view-search/:id",
    loadChildren:
      "app/pages/search/view-search/view-search.module#ViewSearchModule",
  },
  {
    path: "view-search-unknown",
    loadChildren:
      "app/pages/search/view-search-unknown/view-search-unknown.module#ViewSearchUnknownModule",
  },
  {
    path: "view-search/:id/camera/:cameraId",
    loadChildren:
      "app/pages/search/view-search-camera/view-search-camera.module#ViewSearchCameraModule",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
