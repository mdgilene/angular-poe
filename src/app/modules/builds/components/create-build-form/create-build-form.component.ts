import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Build, ClassCombos } from '../../models/Build';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemBrowserComponent } from '../item-browser/item-browser.component';

@Component({
  selector: 'app-create-build-form',
  templateUrl: './create-build-form.component.html',
  styleUrls: ['./create-build-form.component.css']
})
export class CreateBuildFormComponent implements OnInit {
  model: Build;
  classCombos = ClassCombos;

  buildForm = new FormGroup({
    info: new FormGroup({
      name: new FormControl(''),
      class: new FormControl('')
    }),
    items: new FormGroup({
      head: new FormControl({}),
      body: new FormControl({}),
      weapon1: new FormControl({}),
      weapon2: new FormControl({}),
      gloves: new FormControl({}),
      boots: new FormControl({}),
      ring1: new FormControl({}),
      ring2: new FormControl({}),
      amulet: new FormControl({}),
      belt: new FormControl({})
    })
  });

  constructor(private modalService: NgbModal) {
    this.model = {
      name: '',
      class: {}
    };
  }

  ngOnInit() {}

  handleSubmit() {
    // this.model.class.primary = ClassCombos.find(c =>
    //   c.secondary.includes(this.model.class.secondary)
    // ).primary;
    // console.log(this.model);
    console.log(this.buildForm.value);
  }

  openItemBrowser(e) {
    const modalRef = this.modalService.open(ItemBrowserComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'custom-large-modal'
    });
    modalRef.componentInstance.slot = e.target.slot;
  }
}
