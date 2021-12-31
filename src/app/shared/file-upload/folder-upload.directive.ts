import { Directive, Output, EventEmitter, HostListener } from "@angular/core";

@Directive({
  selector: "[folderDrop]"
})
export class FolderDropDirective {
  @Output() folderDropped = new EventEmitter<FileList>();
  @Output() folderHovered = new EventEmitter<boolean>();

  constructor() {
  }

  @HostListener("drop", ["$event"])
  onDrop($event) {
    $event.preventDefault();
    this.folderDropped.emit($event);
    this.folderHovered.emit(false);
  }

  @HostListener("dragover", ["$event"])
  onDragOver($event) {
    event.preventDefault();

    this.folderHovered.emit(true);
  }

  @HostListener("dragleave", ["$event"])
  onDragLeave($event) {
    this.folderHovered.emit(false);
  }
}
