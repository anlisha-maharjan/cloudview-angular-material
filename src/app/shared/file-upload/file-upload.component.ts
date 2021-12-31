import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  Output,
  AfterViewChecked,
  AfterContentChecked,
  ViewEncapsulation,
} from "@angular/core";

import * as _ from "lodash";
import { AlertService } from "app/services/alert.service";
import { MatDialog } from "@angular/material";

@Component({
  selector: "cloudview-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FileUploadComponent
  implements OnInit, AfterViewInit, AfterContentChecked {
  multiple = false;
  multipleCount = 0;
  dropzoneActive = false;

  @Input() fileUp: boolean = false;
  @Input() multipleFile: string;
  @Input() folderUpload: string;
  @Input() inputType: string;
  @Input() @Output() attachments: any = [];
  constructor(private _alertService: AlertService, public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // set multiple true
    const fileSelector = document.getElementById("fileSelector");
    if (this.multipleFile == "true") {
      fileSelector.setAttribute("multiple", "");
    }

    if (this.folderUpload == "true") {
      fileSelector.setAttribute("webkitdirectory", "");
    }

    // Input Type
    if (this.inputType == "image") {
      fileSelector.setAttribute("accept", "image/*");
    } else if (this.inputType == "audio") {
      fileSelector.setAttribute("accept", "audio/*");
    } else if (this.inputType == "video") {
      fileSelector.setAttribute("accept", "video/*");
    } else if (this.inputType == "documents") {
      fileSelector.setAttribute(
        "accept",
        ".xlsx, .xls, .csv, .doc, .docx,.ppt, .pptx, .txt, .pdf"
      );
    } else {
      fileSelector.setAttribute("accept", "all");
    }
  }

  ngAfterContentChecked() {
    if (this.attachments && this.attachments.length > 0) {
      this.fileUp = true;
    }
    this.multipleCount = this.attachments ? this.attachments.length : 0;

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
      } else if (
        documentType == "xlsx" ||
        documentType == "xls" ||
        documentType == "csv" ||
        documentType == "docx" ||
        documentType == "doc" ||
        documentType == "txt" ||
        documentType == "pptx" ||
        documentType == "ppt" ||
        documentType == "pdf"
      ) {
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
            value:
              "data:" + file.type + ";base64," + reader.result.split(",")[1],
            filetypeview: fileView,
            fileSize:
              fileSize > 1024
                ? Math.round(rawFileSize / 1024) + "MB"
                : fileSize + "KB",
            type: filetypeRaw,
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

  /*
  // Folder upload
  remove(list, data, index) {
    this.removeSubItems(data);
    list.splice(index, 1);
  }

  removeSubItems(item) {
    if (item.filetype == "folder") {
      item.value.forEach((element) => {
        this.removeSubItems(element);
      });
    } else {
      const matchAttachment = this.attachments.find(
        (value: any) => value.path == item.path
      );
      const i = this.attachments.indexOf(matchAttachment);
      this.attachments.splice(i, 1);
    }
  }

  drop(event) {
    this.dropzoneActive = false;
    const items = event.dataTransfer.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file") {
        const entry = item.webkitGetAsEntry();
        let fileitem = new FileItem();
        this.folder.files.push(fileitem);
        this.checkEntry(entry, fileitem);
      }
    }
    this.folder.name = "1";
    console.log(this.folder);
  }

  dragenter(event) {
    this.dropzoneActive = true;
  }

  dragover(event) {
    this.dropzoneActive = true;
  }

  dragleave(event) {
    this.dropzoneActive = false;
  }

  dragend(event) {
    this.dropzoneActive = false;
  }

  checkEntry(entry, parent) {
    if (entry.isFile) {
      this.parseFileEntry(entry).then((file) => {
        let fileObject: any = file;
        fileObject.path = entry.fullPath;

        // set file content
        // =============================================================

        const reader = new FileReader();
        this.multipleCount += 1;
        reader.readAsDataURL(fileObject);

        let fileView = "";
        const filetypeRaw = fileObject.type.split("/")[0];
        const filetypeRawSec = fileObject.type.split("/")[1];
        const documentType = fileObject.name.split(".")[1];
        let dropFileValid = fileObject.name.split(".")[1];

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
        } else if (
          documentType == "xlsx" ||
          documentType == "xls" ||
          documentType == "csv" ||
          documentType == "docx" ||
          documentType == "doc" ||
          documentType == "txt" ||
          documentType == "pptx" ||
          documentType == "ppt" ||
          documentType == "pdf"
        ) {
          fileView = "other";
          dropFileValid = "documents";
        } else {
          fileView = "other";
        }
        if (this.inputType == dropFileValid || this.inputType == "all") {
          parent.filename = fileObject.name;
          parent.filetype = fileObject.type;
          parent.path = entry.fullPath;
          reader.onload = () => {
            const rawFileSize = fileObject.size / 1024;
            const fileSize = Math.floor(fileObject.size / 1024);

            const obj = {
              file: fileObject,
              filename: fileObject.name,
              filetype: fileObject.type,
              path: entry.fullPath,
              value:
                "data:" +
                fileObject.type +
                ";base64," +
                reader.result.split(",")[1],
              filetypeview: fileView,
              fileSize:
                fileSize > 1024
                  ? Math.round(rawFileSize / 1024) + "MB"
                  : fileSize + "KB",
              type: filetypeRaw,
            };

            parent.value =
              "data:" +
              fileObject.type +
              ";base64," +
              reader.result.split(",")[1];
            parent.filetypeview = fileView;
            parent.fileSize =
              fileSize > 1024
                ? Math.round(rawFileSize / 1024) + "MB"
                : fileSize + "KB";
            parent.type = filetypeRaw;

            this.attachments.push(obj);
          };

          if (this.multipleCount > 1) {
            this.multiple = true;
          } else {
            this.multiple = false;
          }
          this.fileUp = true;
        }
        // =============================================================
      });
    } else {
      parent.filename = entry.name; // set folder name
      parent.path = entry.fullPath; // set folder path
      parent.filetype = "folder";
      let fileItems = [];
      this.parseDirectoryEntry(entry).then((elements) => {
        Object.values(elements).forEach((element) => {
          var fileItem = new FileItem();
          fileItems.push(fileItem);
          this.checkEntry(element, fileItem);
        });
      });
      parent.value = fileItems;
    }
  }

  parseFileEntry(fileEntry) {
    return new Promise((resolve, reject) => {
      fileEntry.file(
        (file) => {
          resolve(file);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  parseDirectoryEntry(directoryEntry) {
    const directoryReader = directoryEntry.createReader();
    return new Promise((resolve, reject) => {
      directoryReader.readEntries(
        (entries) => {
          resolve(entries);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }*/
}

/*export class FileItem {
  filename: string = "";
  filetype: string = "";
  path: string = "";
  value: any;
  filetypeview: string = "";
  fileSize: string = "";
  type: string = "";
}

export class Folder {
  name: string = "";
  files: any = [];
}*/
