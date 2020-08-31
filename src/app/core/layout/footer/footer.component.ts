import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cloudview-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  visible: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

}
