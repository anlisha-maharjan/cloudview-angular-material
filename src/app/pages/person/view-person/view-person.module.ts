import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { PersonService } from "app/services/person.service";
import { ViewPersonRoutingModule } from "./view-person-routing.module";
import { ViewPersonComponent } from "./view-person.component";
import { NgxGalleryModule } from 'ngx-gallery';
@NgModule({
  imports: [
    CommonModule,
    ViewPersonRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxGalleryModule,
  ],
  providers: [AlertService, PersonService],
  declarations: [ViewPersonComponent],
  exports: [ViewPersonComponent],
})
export class ViewPersonModule {}
