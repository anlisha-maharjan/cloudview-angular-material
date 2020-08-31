import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { AddCatalogComponent } from "./add-catalog.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AddCatalogComponent
      }
    ]),
    MatPaginatorModule
  ],
  exports: [RouterModule]
})
export class AddCatalogRoutingModule {}
