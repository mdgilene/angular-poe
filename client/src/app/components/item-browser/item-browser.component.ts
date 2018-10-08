import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

import { Item, ItemType, ItemFilter } from '../../models/Item';
import { Slot, SlotInfo } from '../../models/build';
import { UniqueItemService } from '../../services/unique-item.service';

@Component({
  selector: 'exilebuilds-item-browser',
  templateUrl: './item-browser.component.html',
  styleUrls: ['./item-browser.component.css']
})
export class ItemBrowserComponent implements OnInit {
  @Input()
  slot: Slot;

  _filter: ItemFilter = {};
  searchText = '';

  items: Observable<Item[]>;
  selectedItem: Item;
  selectedVariant: string;

  // Importing enum to use in template
  ItemType = ItemType;

  validTypes: ItemType[] = [];

  constructor(
    private modalRef: BsModalRef,
    private $uniques: UniqueItemService
  ) {}

  ngOnInit() {
    this.validTypes = SlotInfo[this.slot].validItemTypes;
    this.filter = { itemType: this.validTypes[0] };
  }

  get filter(): ItemFilter {
    return this._filter;
  }

  set filter(filter: ItemFilter) {
    this._filter = Object.assign(this._filter, filter);
    this.items = this.$uniques.filter(this.filter);
  }

  handleSearchChange() {
    this.filter = { name: this.searchText };
  }

  setSelectedItem(item: Item) {
    this.selectedItem = item;
    this.selectedVariant = Object.keys(item.variants).slice(-1)[0];
  }

  close() {
    this.modalRef.hide();
  }

  clearFilter() {
    this._filter = {};
    this.items = this.$uniques.filter(this._filter);
  }

  temp(e) {
    console.log(e);
    console.log(this.selectedVariant);
  }
}
