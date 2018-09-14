import { Component, OnInit, Input } from '@angular/core';
import { ItemService, ItemFilter } from '../../services/item.service';
import { Item, WeaponType, ArmourType } from '../../models/item';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-item-browser',
  templateUrl: './item-browser.component.html',
  styleUrls: ['./item-browser.component.css']
})
export class ItemBrowserComponent implements OnInit {
  @Input()
  slot;

  filter: ItemFilter;

  items: Item[];
  selectedItem: Item;

  constructor(private modalRef: BsModalRef, private itemService: ItemService) {
    console.log();
  }

  ngOnInit() {
    if (this.slot === 'Weapon 1') {
      this.setFilter({
        type: Object.values(WeaponType)
      });
    } else if (this.slot === 'Weapon 2') {
      this.setFilter({
        type: [
          WeaponType.OneHandedAxe,
          WeaponType.OneHandedMace,
          WeaponType.OneHandedSword,
          WeaponType.Dagger,
          WeaponType.Wand,
          ArmourType.Quiver,
          ArmourType.Shield
        ]
      });
    } else {
      this.setFilter({
        type: this.slot
      });
    }

    this.getFilteredItems().subscribe(items => (this.items = items));
  }

  setSelected(item: Item) {
    this.selectedItem = item;
  }

  close() {
    this.modalRef.hide();
  }

  setFilter(filter: ItemFilter) {
    this.filter = filter;
  }

  getFilteredItems() {
    return this.itemService.getFilteredItems(this.filter);
  }
}
