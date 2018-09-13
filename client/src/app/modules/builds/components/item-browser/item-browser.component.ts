import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-item-browser',
  templateUrl: './item-browser.component.html',
  styleUrls: ['./item-browser.component.css']
})
export class ItemBrowserComponent implements OnInit {
  @Input()
  slot;

  filter: string;
  search: string;

  items: Item[];
  selectedItem: Item;

  constructor(
    public activeModal: NgbActiveModal,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.itemService
      .getFilteredItems({})
      .subscribe(items => (this.items = items));
  }

  setSelected(item: Item) {
    console.log('item selected', item);
    this.selectedItem = item;
  }

  close() {
    console.log('closing modal with item', this.selectedItem);
    this.activeModal.close(this.selectedItem);
  }

  setFilter(filter: string) {
    this.filter = filter;
  }

  getFilteredItems() {
    return this.itemService.getFilteredItems({
      type: this.filter,
      search: this.search
    });
  }
}
