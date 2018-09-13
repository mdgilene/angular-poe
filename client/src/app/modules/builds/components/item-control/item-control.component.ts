import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemBrowserComponent } from '../item-browser/item-browser.component';

@Component({
  selector: 'app-item-control',
  templateUrl: './item-control.component.html',
  styleUrls: ['./item-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemControlComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class ItemControlComponent implements ControlValueAccessor {
  @Input()
  slot;

  @Input('value')
  _value = {};

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private modalService: NgbModal) {}

  handleClick() {
    const modalRef = this.modalService.open(ItemBrowserComponent, {
      centered: true,
      windowClass: 'custom-large-modal'
    });
    modalRef.componentInstance.slot = this.slot;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
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
