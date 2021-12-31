import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { ViewCameraComponent } from "./view-camera.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: ViewCameraComponent
      }
    ]),
    MatPaginatorModule
  ],
  exports: [RouterModule]
})
export class ViewCameraRoutingModule { }
