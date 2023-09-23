import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';

const BASE_OPTIONS = ['Option1', 'Option2', 'Option3']

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent {
  public select = new FormControl();
  public activeFilterChips: string[] = [];

  public filteredOptions$ = this.select.valueChanges.pipe(
    startWith(''),
    map(v=>{
      const FILTERED = BASE_OPTIONS; //[TODO: haus20xx]: implement filter

      return v && !FILTERED.find(opt=>v===opt) ? [v, ...FILTERED]: FILTERED;
    })
  );

  public onOptionSelect(option: string) {
    this.activeFilterChips.push(option);
    this.select.setValue('');
  }
}
