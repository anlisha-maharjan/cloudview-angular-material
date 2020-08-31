import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ListModule } from "app/shared/list/list.module";
import { AspectRatioModule } from "../../shared/aspect-ratio/aspect-ratio.module";
import { MaterialModule } from "../../shared/material-components.module";
import { DataService } from "app/services/table.data.service";
import { AlertService } from "app/services/alert.service";
import { PersonRoutingModule } from "./person-routing.module";
import { PersonComponent } from "./person.component";
import { PersonService } from "../../services/person.service";
import { AddPersonModule } from "./add-person/add-person.module";
import { CatalogService } from "app/services/catalog.service";
import { FileUploadModule } from "app/shared/file-upload/file-upload.module";
@NgModule({
  imports: [
    CommonModule,
    PersonRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    ListModule,
    AddPersonModule,
    // Core
    AspectRatioModule
  ],
  declarations: [PersonComponent],
  providers: [PersonService, DataService, AlertService, CatalogService]
})
export class PersonModule {}
