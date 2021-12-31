import { Directive } from '@angular/core';

@Directive({
  selector: '[cloudviewAspectRatioContent]',
  host: { '[class.cloudview-aspect-ratio-content-element]': 'true' }
})
export class AspectRatioContentDirective {

  constructor() {
  }

}
