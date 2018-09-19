import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'exilebuilds-item-control',
  templateUrl: './item-control.component.html',
  styleUrls: ['./item-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemControlComponent),
      multi: true
    }
  ]
})
export class ItemControlComponent implements ControlValueAccessor {
  @Input('value')
  _value = {};

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  clearValue(e: MouseEvent) {
    e.stopPropagation();
    this.value = {};
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  get hasValue() {
    return Object.keys(this.value).length > 0;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
