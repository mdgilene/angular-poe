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
  @Input()
  currentItems;

  filter: ItemFilter;

  items: Item[];
  selectedItem: Item = {};

  constructor(private modalRef: BsModalRef, private itemService: ItemService) {
    console.log();
  }

  ngOnInit() {
    if (this.slot === 'Weapon 1') {
      const { weapon2 } = this.currentItems;
      if (weapon2.itemType === ArmourType.Quiver) {
        this.setFilter({
          type: WeaponType.Bow
        });
      } else if (weapon2.itemType === WeaponType.Wand) {
        this.setFilter({
          type: WeaponType.Wand
        });
      } else if (weapon2.itemType === ArmourType.Shield) {
        this.setFilter({
          type: [
            WeaponType.OneHandedAxe,
            WeaponType.OneHandedMace,
            WeaponType.OneHandedSword,
            WeaponType.Dagger,
            WeaponType.Wand
          ]
        });
      } else {
        this.setFilter({
          type: [
            WeaponType.TwoHandedAxe,
            WeaponType.TwoHandedMace,
            WeaponType.TwoHandedSword,
            WeaponType.OneHandedAxe,
            WeaponType.OneHandedMace,
            WeaponType.OneHandedSword,
            WeaponType.Dagger,
            WeaponType.Wand,
            WeaponType.Bow
          ]
        });
      }
    } else if (this.slot === 'Weapon 2') {
      const { weapon1 } = this.currentItems;
      if (weapon1.itemType === WeaponType.Bow) {
        this.setFilter({
          type: ArmourType.Quiver
        });
      } else if (weapon1.itemType === WeaponType.Wand) {
        this.setFilter({
          type: [WeaponType.Wand, ArmourType.Shield]
        });
      } else {
        this.setFilter({
          type: [
            WeaponType.OneHandedAxe,
            WeaponType.OneHandedMace,
            WeaponType.OneHandedSword,
            WeaponType.Dagger,
            ArmourType.Shield,
            ArmourType.Quiver
          ]
        });
      }
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
