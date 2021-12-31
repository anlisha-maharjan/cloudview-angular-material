import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { ViewCatalogComponent } from "./view-catalog.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: ViewCatalogComponent
      }
    ]),
    MatPaginatorModule
  ],
  exports: [RouterModule]
})
export class ViewCatalogRoutingModule {}
