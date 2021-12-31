import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { AddNetworkDriveFolderComponent } from "./add-network-drive-folder.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AddNetworkDriveFolderComponent
      }
    ]),
    MatPaginatorModule
  ],
  exports: [RouterModule]
})
export class AddNetworkDriveFolderRoutingModule { }
