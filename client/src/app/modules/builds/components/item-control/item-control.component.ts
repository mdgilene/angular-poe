import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ItemBrowserComponent } from '../item-browser/item-browser.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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

  @Input('items')
  currentItems;

  @Input('value')
  _value = {};

  modalRef: BsModalRef;

  showModal: boolean;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private modalService: BsModalService) {}
  openItemBrowser(e) {
    this.modalRef = this.modalService.show(ItemBrowserComponent, {
      initialState: {
        slot: this.slot,
        currentItems: this.currentItems
      },
      class: 'item-browser'
    });

    this.modalService.onHide.subscribe(() => {
      if (Object.keys(this.modalRef.content.selectedItem).length > 0) {
        this.value = this.modalRef.content.selectedItem;
      }
    });
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
