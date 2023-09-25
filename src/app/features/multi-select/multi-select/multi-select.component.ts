import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs";

const BASE_OPTIONS = ["Option1", "Option2", "Option3"];

@Component({
  selector: "app-multi-select",
  templateUrl: "./multi-select.component.html",
  styleUrls: ["./multi-select.component.scss"],
})
export class MultiSelectComponent {
  public select = new FormControl("", {
    nonNullable: true,
  });
  public activeFilterChips: Set<string> = new Set();

  public filteredOptions$ = this.select.valueChanges.pipe(
    startWith(""),
    map((value: string) => {
      const FILTERED_OPTIONS = BASE_OPTIONS.filter((opt) => {
        const lowerOpt = opt.toLowerCase();
        const chipExists = !(
          [...this.activeFilterChips].find(
            (chip) => chip.toLowerCase() === lowerOpt,
          ) == null
        );
        //Only present values which are not active as chips nor the typed text
        return !chipExists;
      });

      return value.length > 0 &&
        FILTERED_OPTIONS.find(
          (opt) => value.toLowerCase() === opt.toLowerCase(),
        ) == null
        ? [value, ...FILTERED_OPTIONS]
        : FILTERED_OPTIONS;
    }),
  );

  public onOptionSelect(option: string): void {
    this.activeFilterChips.add(option);
    this.select.setValue("");
  }

  public onChipRemove(target: string): void {
    this.activeFilterChips.delete(target);
    //Retrigger filter
    this.select.setValue(this.select.value);
  }
}
