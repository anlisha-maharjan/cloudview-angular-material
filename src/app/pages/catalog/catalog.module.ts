import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ListModule } from "app/shared/list/list.module";
import { AspectRatioModule } from "../../shared/aspect-ratio/aspect-ratio.module";
import { MaterialModule } from "../../shared/material-components.module";
import { DataService } from "app/services/table.data.service";
import { AlertService } from "app/services/alert.service";
import { CatalogRoutingModule } from "./catalog-routing.module";
import { CatalogComponent } from "./catalog.component";
import { CatalogService } from "../../services/catalog.service";
import { AddCatalogModule } from "./add-catalog/add-catalog.module";

@NgModule({
  imports: [
    CommonModule,
    CatalogRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ListModule,
    AddCatalogModule,
    // Core
    AspectRatioModule
  ],
  declarations: [CatalogComponent],
  providers: [CatalogService, DataService, AlertService]
})
export class CatalogModule {}
