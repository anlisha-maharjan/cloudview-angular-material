import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  Output,
  AfterViewChecked,
  AfterContentChecked,
  ViewEncapsulation
} from "@angular/core";

import * as _ from "lodash";
import { AlertService } from "app/services/alert.service";
import { MatDialog } from "@angular/material";

@Component({
  selector: "cloudview-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class FileUploadComponent
  implements OnInit, AfterViewInit, AfterContentChecked {
  // fileUp = false;
  multiple = false;
  multipleCount = 0;
  dropzoneActive = false;
  follow = true;
  enablePan = true;

  @Input() fileUp: boolean = false;
  @Input() multipleFile: string;
  @Input() inputType: string;
  @Input()
  @Output()
  attachments: any = [];
  constructor(private _alertService: AlertService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // set multiple true
    const fileSelector = document.getElementById("fileSelector");
    if (this.multipleFile == "true") {
      fileSelector.setAttribute("multiple", "");
    }

    // Input Type
    if (this.inputType == "image") {
      fileSelector.setAttribute("accept", "image/*");
    } else if (this.inputType == "audio") {
      fileSelector.setAttribute("accept", "audio/*");
    } else if (this.inputType == "video") {
      fileSelector.setAttribute("accept", "video/*");
    } else if (this.inputType == "documents") {
      fileSelector.setAttribute("accept", ".xlsx, .xls, .csv, .doc, .docx,.ppt, .pptx, .txt, .pdf");
    } else {
      fileSelector.setAttribute("accept", "all");
    }
  }

  ngAfterContentChecked() {
    if (this.attachments && this.attachments.length > 0) {
      this.fileUp = true;
    }
    this.multipleCount = (this.attachments) ? this.attachments.length : 0;

    if (this.attachments && this.attachments.length > 1) {
      this.multiple = true;
    }
  }

  dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }

  handleUpload(files: FileList, element) {
    if (files.length > 1 && this.multipleFile != "true") {
      this._alertService.showMessage(
        "Error",
        " Multiple files are not allowed. <br> Please select a single file.",
        "dialog",
        "",
        400
      );
    } else {
      this.getUpFiles(files, element);
    }
  }

  getUpFiles(files, element) {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const file = files[i];
      this.multipleCount += 1;
      reader.readAsDataURL(file);

      let fileView = "";
      const filetypeRaw = file.type.split("/")[0];
      const filetypeRawSec = file.type.split("/")[1];
      const documentType = file.name.split(".")[1];
      let dropFileValid = file.name.split(".")[1];

      if (filetypeRaw == "image") {
        fileView = "image";
        dropFileValid = "image";
        if (filetypeRawSec == "svg+xml") {
          fileView = "other";
        }
      } else if (filetypeRaw == "video") {
        fileView = "video";
        dropFileValid = "video";
      } else if (filetypeRaw == "audio") {
        fileView = "audio";
        dropFileValid = "audio";
      } else if (documentType == "xlsx" || documentType == "xls" || documentType == "csv" || documentType == "docx" || documentType == "doc" || documentType == "txt" || documentType == "pptx" || documentType == "ppt" || documentType == "pdf") {
        fileView = "other";
        dropFileValid = "documents";
      } else {
        fileView = "other";
      }

      if (this.inputType == dropFileValid || this.inputType == "all") {
        reader.onload = () => {
          const rawFileSize = file.size / 1024;
          const fileSize = Math.floor(file.size / 1024);

          const obj = {
            file: file,
            filename: file.name,
            filetype: file.type,
            value: "data:" + file.type + ";base64," + reader.result.split(",")[1],
            filetypeview: fileView,
            fileSize: fileSize > 1024 ? Math.round(rawFileSize / 1024) + 'MB' : fileSize + 'KB',
            type: filetypeRaw
          };

          if (this.multipleFile == "false") {
            this.removeAttachment(0);
            this.multipleCount -= 1;
            element.push(obj);
            this.fileUp = true;
          } else {
            element.push(obj);
          }
        };

        if (this.multipleCount > 1) {
          this.multiple = true;
        } else {
          this.multiple = false;
        }
        this.fileUp = true;
      } else {
        this._alertService.showMessage(
          "Warning",
          this.inputType.toLocaleUpperCase() + " files only allowed.",
          "dialog",
          "",
          400
        );
      }
    }
  }

  // remove images from properties when cross icon is presseed
  removeAttachment(index) {
    if (this.attachments) {
      this.attachments.splice(index, 1);
      this.multipleCount -= 1;
    }
    if (this.attachments && this.attachments.length === 0) {
      this.fileUp = false;
    }
    if (this.multipleCount === 1) {
      this.multiple = false;
    }
  }
}
