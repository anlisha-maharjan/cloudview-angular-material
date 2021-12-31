import {
  Component,
  Inject,
  OnInit} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "cloudview-alertdialog",
  templateUrl: "./alert-dialog.component.html",
  styleUrls: ["./alert-dialog.components.scss"]
})
export class AlertDialogComponent implements OnInit {
  message: any;
  constructor(
    private dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  public closeDialog() {
    this.dialogRef.close();
  }
}
