import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'exilebuilds-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input()
  item;
  @Input()
  selected;

  constructor() {}

  ngOnInit() {}
}
