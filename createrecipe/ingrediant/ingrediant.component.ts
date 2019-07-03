import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

import { ingrediant } from '../model';





@Component({
  selector: 'app-ingrediant',
  templateUrl: './ingrediant.component.html',
  styleUrls: ['./ingrediant.component.css']
})
export class IngrediantComponent implements OnInit, AfterViewInit {
  @Input() ingrediants:ingrediant[];
  customerForm: FormGroup;
  emailMessage: string;
  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.customerForm = this.fb.group({
      addresses: this.fb.array([])
    });
    if(this.ingrediants) {
      for(let ing of this.ingrediants){
        this.addresses.push(
        this.fb.group({
          street1: [ing.name, Validators.required],
        }));
      }
      
    } else {
      this.addAddress();
    }
    
    
  }
  ngAfterViewInit():void{

  }
  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      street1: ['', Validators.required],
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
  
}
