
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { PersonService } from "app/services/person.service";
import { AddPersonRoutingModule } from "./add-person-routing.module";
import { AddPersonComponent } from "./add-person.component";
import { QuillModule } from 'ngx-quill';
import {SlideshowModule} from 'ng-simple-slideshow';
@NgModule({
  imports: [
    CommonModule,
    AddPersonRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule,
    SlideshowModule
  ],
  providers: [AlertService, PersonService],
  declarations: [AddPersonComponent],
  exports: [AddPersonComponent]
})
export class AddPersonModule { }
