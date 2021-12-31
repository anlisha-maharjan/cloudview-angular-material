import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { ViewSearchCameraComponent } from "./view-search-camera.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: ViewSearchCameraComponent,
      },
    ]),
    MatPaginatorModule,
  ],
  exports: [RouterModule],
})
export class ViewSearchCameraRoutingModule {}
