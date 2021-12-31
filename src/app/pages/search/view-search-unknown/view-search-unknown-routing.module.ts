import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatPaginatorModule } from "@angular/material";
import { ViewSearchUnknownComponent } from "./view-search-unknown.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: ViewSearchUnknownComponent,
      },
    ]),
    MatPaginatorModule,
  ],
  exports: [RouterModule],
})
export class ViewSearchUnknownRoutingModule {}
