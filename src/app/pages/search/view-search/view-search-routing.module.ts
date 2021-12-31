import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { ViewSearchComponent } from "./view-search.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: ViewSearchComponent,
      },
    ]),
    MatPaginatorModule,
  ],
  exports: [RouterModule],
})
export class ViewSearchRoutingModule {}
