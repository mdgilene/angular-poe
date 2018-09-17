import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Build, ClassCombos } from '../../models/build';
import { WeaponType } from '../../models/item';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ItemBrowserComponent } from '../item-browser/item-browser.component';

@Component({
  selector: 'app-create-build-form',
  templateUrl: './create-build-form.component.html',
  styleUrls: ['./create-build-form.component.css']
})
export class CreateBuildFormComponent {
  classCombos = ClassCombos;

  modalRef: BsModalRef;

  showWeapon2 = true;

  buildForm = new FormGroup({
    info: new FormGroup({
      name: new FormControl(''),
      class: new FormControl('Pathfinder')
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

  constructor(private modalService: BsModalService) {
    // Show/Hide weapon2 depending on what is in main hand
    this.buildForm.valueChanges.subscribe(values => {
      const weapon1 = values.items.weapon1;
      if (
        weapon1.itemType === WeaponType.TwoHandedAxe ||
        weapon1.itemType === WeaponType.TwoHandedMace ||
        weapon1.itemType === WeaponType.TwoHandedSword
      ) {
        this.showWeapon2 = false;
      } else {
        this.showWeapon2 = true;
      }
    });

    this.modalService.onHide.subscribe(reason => {
      if (reason === null) {
        this.buildForm.patchValue({
          items: {
            [this.modalRef.content.slot]: this.modalRef.content.selectedItem
          }
        });
      }
    });
  }

  handleSubmit() {
    const build = this.formToModel();
    console.log(build);
  }

  openItemBrowser(slot) {
    this.modalRef = this.modalService.show(ItemBrowserComponent, {
      initialState: {
        slot: slot,
        currentItems: this.buildForm.value.items
      },
      class: 'item-browser'
    });
  }

  formToModel(): Build {
    const form = this.buildForm.value;
    return {
      name: form.info.name,
      class: {
        primary: ClassCombos.find(c => c.secondary.includes(form.info.class))
          .primary,
        secondary: form.info.class
      },
      items: form.items
    };
  }
}
