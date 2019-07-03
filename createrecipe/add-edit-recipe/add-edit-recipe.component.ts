import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

import { Recipe } from '../model';
import { RecipeService } from '../recipe.service'
@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.css']
})
export class AddEditRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  recipeData:Recipe = {
    'id':1,
    'name':"Scrambled Eggs",
    'overview':"Beat the eggs]] in a bowl with a fork or whisk. Determine how many servings you'd like to make and plan on using 2 eggs per person.",
    'ingrediants':[
        {name:"2 eggs per person"},
        {name:"*1 teaspoon (4.5 g) of butter"},
        {name:"*Salt and pepper to taste"}
    ],
    'steps':[{
        id:1,
        description: "in a bowl with a fork or whisk. Determine how many servings you'd like to make and plan on using 2 eggs per person.",
        time:11,
        photo:"",
        photoData: "",
        video:""
    },{
        id:2,
        description: "To prevent bits of shell from getting into the eggs, crack them against a flat surface instead of the rim of the bowl.",
        time:11,
        photo:"",
        photoData: "",
        video:""
    },{
        id:3,
        description: "Heat the butter in a skillet over medium-high heat. Put 1 teaspoon (4.5 g) of butter into a small non-stick skillet and turn the burner to medium-high. Let the pan heat for about 1 minute so the butter melts and foams a little. Tilt the pan around so the butter coats the bottom and sides of the skillet.<ref>https://www.southernliving.com/dairy/eggs/scrambled-eggs-with-milk</ref><br><br>{{whvid|Make Scrambled Eggs Step 3 Version 3.360p.mp4|Make Scrambled Eggs Step 3-preview Version 3.jpg|Make Scrambled Eggs Step 3 Version 4.jpg|gif=Make Scrambled Eggs Step 3 Version 3.360p.gif|giffirst=Make Scrambled Eggs Step 3 Version 3.",
        time:11,
        photo:"",
        photoData: "",
        video:""
    }]
  };
  recipeData1:Recipe;
  constructor(private fb: FormBuilder, private recipService:RecipeService) { }

  ngOnInit() {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      overview: ['', [Validators.maxLength(500)]]
    });
    this.recipService.getRecipes().subscribe(data=>console.log(data));
    this.populateTestData();
  }
  populateTestData(): void {
    if(this.recipeData){
      this.recipeForm.patchValue({
        name: this.recipeData.name,
        overview: this.recipeData.overview
      });
    }
  }
  save() {
    console.log(this.recipeForm);
    console.log('Saved: ' + JSON.stringify(this.recipeForm.value));
  }
}
