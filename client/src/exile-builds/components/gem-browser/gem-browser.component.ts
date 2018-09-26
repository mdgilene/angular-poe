import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { GemTag } from '../../models/item';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Gem } from '../../models/build';

@Component({
  selector: 'exilebuilds-gem-browser',
  templateUrl: './gem-browser.component.html',
  styleUrls: ['./gem-browser.component.css']
})
export class GemBrowserComponent implements OnInit {
  @Input()
  currentLinks;

  Tag = GemTag;

  filter = {
    search: '',
    tags: []
  };

  gems: Gem[];
  selectedGem: Gem = {};

  constructor(private modalRef: BsModalRef, private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getGems().subscribe(items => (this.gems = items));
  }

  setSelected(gem: Gem) {}

  close() {
    this.modalRef.hide();
  }

  toggleFilter(filter: GemTag) {}

  get filteredGems() {
    return this.itemService.getGems();
  }

  get itemServiceError() {
    return this.itemService.error;
  }
}
