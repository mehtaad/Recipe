import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import {observable, Observable} from 'rxjs'
import { debounceTime, subscribeOn } from 'rxjs/operators';

import { step } from '../model';
const urlRegex = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$','i')
function videoUrlVlidation(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.css']
})
export class MethodsComponent implements OnInit {
  public imgURL: any = [];
  public videoURL: any = [];
  customerForm: FormGroup;
  emailMessage: string;
  @Input() steps:step[];
  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.customerForm = this.fb.group({
      addresses: this.fb.array([])
    });
    if(this.steps) {
      for(let step of this.steps){
        this.addresses.push(
        this.fb.group({
          street1: [step.description, Validators.required],
          street1time: [step.time, Validators.required],
          street1photo: [''],
          street1photoData: [step.photoData?step.photoData:''],
          street1video: [step.video?step.video:'', Validators.pattern(urlRegex)]
        }));
      }
      
    } else {
      this.addAddress();
    }
  }
  addAddress(): void {
    this.addresses.push(this.buildAddress());
    console.log(this.addresses);
  }
  buildAddress(): FormGroup {
    return this.fb.group({
      street1: ['', Validators.required],
      street1time: ['', Validators.required],
      street1photo: [''],
      street1photoData: [''],
      street1video: ['', Validators.pattern(urlRegex)]
    });
  }
  populateTestData(): void {
    const addressGroup = this.fb.group({
      street1: 'Mermaid Quay',
    });
    this.customerForm.setControl('addresses', this.fb.array([addressGroup]));
  }
  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }
  deleteIngrediant(index:number) {
  	this.addresses.controls.splice(index,1);
  	this.addresses.controls[this.addresses.controls.length-1].updateValueAndValidity();
  }
  previewVideo(index) {
    this.addresses.controls[index+''].updateValueAndValidity();
  }
  preview(file:any, index:string) 
  {
    let files = file.files;
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      //this.addresses.controls[index].controls.street1photoData.valid=false;
      //message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    //imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL[index] = reader.result; 
      console.log(this.imgURL);
    }
  }
  isURLReal(fullyQualifiedURL:string, index:number) {
    var video = document.createElement('video');
    video.onloadeddata = ()=> this.videoURL[index]=fullyQualifiedURL;
    video.onerror = () =>{
      this.videoURL[index]="";
    }
    video.src = fullyQualifiedURL;
  }
  clearValue(index:number, prop:string) {
    this.addresses.controls[index+''].controls[prop].reset();
  }
  
}