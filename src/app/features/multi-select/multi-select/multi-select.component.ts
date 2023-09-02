import { Component } from "@angular/core"
import { FormControl } from "@angular/forms"
import { map, startWith } from "rxjs"

const BASE_OPTIONS = ["Option1", "Option2", "Option3"]

@Component({
  selector: "app-multi-select",
  templateUrl: "./multi-select.component.html",
  styleUrls: ["./multi-select.component.scss"],
})
export class MultiSelectComponent {
  public select = new FormControl()
  public activeFilterChips: Set<string> = new Set()

  public filteredOptions$ = this.select.valueChanges.pipe(
    startWith(""),
    map((value: string) => {
      const FILTERED = BASE_OPTIONS.filter((opt) => {
        const lower_opt = opt.toLowerCase()
        const lower_value = value.toLowerCase()
        const termExists = lower_opt === lower_value
        const chipExists = [...this.activeFilterChips].find(
          (chip) => chip.toLowerCase() === lower_opt,
        )
        //Only present values which are not active as chips nor the typed text
        return !termExists && !chipExists
      })

      return value && !FILTERED.find((opt) => value === opt)
        ? [value, ...FILTERED]
        : FILTERED
    }),
  )

  public onOptionSelect(option: string): void {
    this.activeFilterChips.add(option)
    this.select.setValue("")
  }

  public onChipRemove(target: string): void {
    this.activeFilterChips.delete(target)
    //Retrigger filter
    this.select.setValue(this.select.value)
  }
}
