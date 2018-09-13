import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-browser',
  templateUrl: './item-browser.component.html',
  styleUrls: ['./item-browser.component.css']
})
export class ItemBrowserComponent implements OnInit {
  @Input()
  slot;

  constructor(
    public activeModal: NgbActiveModal,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.itemService.getData();
  }
}
