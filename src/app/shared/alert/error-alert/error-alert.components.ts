import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "malling-erroralert",
  templateUrl: "./error-alert.component.html",
  styleUrls: ["./error-alert.components.scss"]
})
export class ErrorAlertComponent implements OnInit {
  @Input() message = "";
  @Output() output = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  public closeAlert() {
    this.message = "";
  }
}
