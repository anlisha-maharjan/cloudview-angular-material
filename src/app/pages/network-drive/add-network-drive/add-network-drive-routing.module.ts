import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { AddNetworkDriveComponent } from "./add-network-drive.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AddNetworkDriveComponent
      }
    ]),
    MatPaginatorModule
  ],
  exports: [RouterModule]
})
export class AddNetworkDriveRoutingModule { }
