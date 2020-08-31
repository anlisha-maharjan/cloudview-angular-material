import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { CatalogService } from "app/services/catalog.service";
import { AddCatalogRoutingModule } from "./add-catalog-routing.module";
import { AddCatalogComponent } from "./add-catalog.component";
import { QuillModule } from 'ngx-quill';
@NgModule({
  imports: [
    CommonModule,
    AddCatalogRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule
  ],
  providers: [AlertService, CatalogService],
  declarations: [AddCatalogComponent],
  exports: [AddCatalogComponent]
})
export class AddCatalogModule {}
