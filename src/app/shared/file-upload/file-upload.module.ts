import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "../../shared/material-components.module";
import { FileUploadComponent } from "./file-upload.component";
import { FileDropDirective } from "./file-upload.directive";
import { AlertService } from "app/services/alert.service";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [FileUploadComponent, FileDropDirective],
  providers: [AlertService],
  exports: [FileUploadComponent]
})
export class FileUploadModule {}
