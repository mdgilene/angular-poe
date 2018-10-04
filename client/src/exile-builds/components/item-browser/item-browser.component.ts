import { Component, OnInit, Input } from '@angular/core';
import { UniqueItemService } from '../../services/unique-item.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { default as itemRestrictions } from '../../resources/item-restrictions.json';

import { Item, ItemType, ItemFilter } from '../../models/ItemNew';
import { Observable } from 'rxjs';

@Component({
  selector: 'exilebuilds-item-browser',
  templateUrl: './item-browser.component.html',
  styleUrls: ['./item-browser.component.css']
})
export class ItemBrowserComponent implements OnInit {
  _filter: ItemFilter = {};
  searchText = '';
  items: Observable<Item[]>;

  ItemType = ItemType;

  constructor(
    private modalRef: BsModalRef,
    private $uniques: UniqueItemService
  ) {}

  ngOnInit() {
    this.filter = { itemType: ItemType.AMULET };
  }

  get filter(): ItemFilter {
    return this._filter;
  }

  set filter(filter: ItemFilter) {
    console.log(filter);
    this._filter = Object.assign(this._filter, filter);
    console.log(this._filter);
    this.items = this.$uniques.filter(this.filter);
  }

  handleSearchChange() {
    this.filter = { name: this.searchText };
  }

  setSelected() {}

  //#region
  /*
  @Input()
  slot;
  @Input()
  currentItems;

  filter: ItemFilter = {
    type: ArmourType.Helmet
  };

  items: Item[];
  selectedItem: Item = {};

  constructor(private modalRef: BsModalRef, private itemService: ItemService) {}


  ngOnInit() {
    const validTypes: string[] = [];
    Object.keys(itemRestrictions).forEach(itemType => {
      if (itemRestrictions[itemType].slots.includes(this.slot)) {
        validTypes.push(itemType);
      }
    });

    this.setFilter({
      type: validTypes
    });

    //this.getFilteredItems().subscribe(items => (this.items = items));
  }

  setSelected(item: Item) {
    const canUseWith = itemRestrictions[item.itemType].canUseWith;

    if (!itemRestrictions[item.itemType].slots.includes(this.slot)) {
      // Item can't go in this slot
      return;
    }

    if (canUseWith.length === 0) {
      if (this.slot === Slot.WEAPON1 && this.currentItems.weapon2.itemType) {
        // Item is a weapon that cannot be used with anything else (2 handed), thus if
        // offhand is equipped then it's invalid
        return;
      }

      // Not weapon slot, this handles all other armour pieces that have empty canUseWith
      return (this.selectedItem = item);
    }

    for (const itemType of canUseWith) {
      // Get slots that need to be checked, exclude the selected slot
      const slots = itemRestrictions[itemType].slots.filter(
        slot => this.slot !== slot
      );

      // For each slot, check if the item in that slot is in the canUseWith list for the item we
      // are trying to pick.
      for (const slot of slots) {
        if (
          !this.currentItems[slot].itemType ||
          itemRestrictions[item.itemType].canUseWith.includes(
            this.currentItems[slot].itemType
          )
        ) {
          // Valid item
          return (this.selectedItem = item);
        }
      }
    }
  }

  close() {
    this.modalRef.hide();
  }

  setFilter(filter: ItemFilter) {
    this.filter = filter;
  }

  getFilteredItems() {
    //return this.itemService.getFilteredItems(this.filter);
  }
  */
  //#endregion
}
