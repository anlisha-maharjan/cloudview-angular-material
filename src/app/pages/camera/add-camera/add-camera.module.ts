
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { CameraService } from "app/services/camera.service";
import { AddCameraRoutingModule } from "./add-camera-routing.module";
import { AddCameraComponent } from "./add-camera.component";
import { QuillModule } from 'ngx-quill';
@NgModule({
  imports: [
    CommonModule,
    AddCameraRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule
  ],
  providers: [AlertService, CameraService],
  declarations: [AddCameraComponent],
  exports: [AddCameraComponent]
})
export class AddCameraModule { }
