import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    MultiSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  exports: [
    MultiSelectComponent
  ]
})
export class MultiSelectModule { }
