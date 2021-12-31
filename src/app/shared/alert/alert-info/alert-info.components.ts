import {
  Component,
  Inject,
  OnInit} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "cloudview-alertinfo",
  templateUrl: "./alert-info.component.html",
  styleUrls: ["./alert-info.components.scss"]
})
export class AlertInfoComponent implements OnInit {
  message: any;
  constructor(
    private dialogRef: MatDialogRef<AlertInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  public closeDialog() {
    this.dialogRef.close();
  }
}
