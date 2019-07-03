
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';  
import { RecipeService } from './recipe.service';
/* import { IngrediantComponent } from './ingrediant/ingrediant.component';
import { StepsComponent } from './steps/steps.component';
import { MethodsComponent } from './methods/methods.component';
import { AddEditRecipeComponent } from './add-edit-recipe/add-edit-recipe.component';*/
import { RecipeListComponent } from './recipe-list.component'; 
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RecipeData } from './recipes-data';
import { ProductEditComponent } from './product-edit.component';
import { ExcuteComponent } from './excute.component';
export const recipeRoutes:Routes = [
      
];
@NgModule({
  providers:[RecipeService], 		
  declarations: [
    /*IngrediantComponent, 
    StepsComponent, 
    MethodsComponent, 
    AddEditRecipeComponent, */
    RecipeListComponent,
    ProductEditComponent,
    ExcuteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(RecipeData),
    RouterModule.forChild(recipeRoutes),
  ]
  
})
export class RecipeModule { }
