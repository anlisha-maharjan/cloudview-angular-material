import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { AddCameraComponent } from "./add-camera.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AddCameraComponent
      }
    ]),
    MatPaginatorModule
  ],
  exports: [RouterModule]
})
export class AddCameraRoutingModule { }
