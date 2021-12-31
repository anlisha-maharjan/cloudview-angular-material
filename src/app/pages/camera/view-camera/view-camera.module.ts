
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { CameraService } from "app/services/camera.service";
import { ViewCameraRoutingModule } from "./view-camera-routing.module";
import { ViewCameraComponent } from "./view-camera.component";
import { QuillModule } from 'ngx-quill';
@NgModule({
  imports: [
    CommonModule,
    ViewCameraRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule
  ],
  providers: [AlertService, CameraService],
  declarations: [ViewCameraComponent],
  exports: [ViewCameraComponent]
})
export class ViewCameraModule { }
