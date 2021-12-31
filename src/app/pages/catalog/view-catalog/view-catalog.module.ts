import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { CatalogService } from "app/services/catalog.service";
import { ViewCatalogRoutingModule } from "./view-catalog-routing.module";
import { ViewCatalogComponent } from "./view-catalog.component";
@NgModule({
  imports: [
    CommonModule,
    ViewCatalogRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AlertService, CatalogService],
  declarations: [ViewCatalogComponent],
  exports: [ViewCatalogComponent],
})
export class ViewCatalogModule {}
