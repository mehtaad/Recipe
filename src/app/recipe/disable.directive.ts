import { NgControl } from '@angular/forms';
import {Input, Directive} from '@angular/core';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {

  @Input() set disableControl( condition : boolean ) {
    const action = condition ? 'disable' : 'enable';
    //console.log("Action is **** "+action);
    this.ngControl.control[action]();
  }

  constructor( private ngControl : NgControl ) {
  }

}