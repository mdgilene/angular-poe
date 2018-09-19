import { Component } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import {
  Build,
  ClassCombos,
  SlotInfo,
  Slot,
  GemGroup
} from '../../models/build';
import { WeaponType } from '../../models/item';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ItemBrowserComponent } from '../item-browser/item-browser.component';

@Component({
  selector: 'exilebuilds-create-build-form',
  templateUrl: './create-build-form.component.html',
  styleUrls: ['./create-build-form.component.css']
})
export class CreateBuildFormComponent {
  ClassCombos = ClassCombos;
  Slot = Slot;
  SlotInfo = SlotInfo;

  modalRef: BsModalRef;

  showWeapon2 = true;

  buildForm = this.fb.group({
    info: this.fb.group({
      name: ['', Validators.required],
      class: ['Pathfinder']
    }),
    items: this.fb.group({
      discussion: [''],
      head: [{}],
      body: [{}],
      weapon1: [{}],
      weapon2: [{}],
      gloves: [{}],
      boots: [{}],
      ring1: [{}],
      ring2: [{}],
      amulet: [{}],
      belt: [{}]
    }),
    skills: this.fb.group({
      discussion: [''],
      gemGroups: this.fb.array([])
    })
  });

  constructor(private modalService: BsModalService, private fb: FormBuilder) {
    // Handle form value changes
    this.buildForm.valueChanges.subscribe(values => {
      // Show/Hide weapon2 depending on what is in main hand
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

        // TODO: Update this.itemSlots to match the maximum number of sockets for the selected item
      }
    });
  }

  handleSubmit() {
    const build = this.formToModel();
    console.log(this.buildForm.status);
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
      items: {
        discussion: '',
        ...form.items
      },
      skills: form.skills
    };
  }

  get items(): FormGroup {
    return this.buildForm.get('items') as FormGroup;
  }

  get gemGroups(): FormArray {
    return this.buildForm.get('skills.gemGroups') as FormArray;
  }

  addSkillGroup() {
    this.gemGroups.push(
      this.fb.group({
        location: ['head'],
        links: this.fb.array([])
      })
    );
  }

  addGem(group) {
    const skillGroup = this.gemGroups.at(group) as FormGroup;
    const location = skillGroup.get('location').value as string;
    const links = skillGroup.get('links') as FormArray;
    if (links.length < SlotInfo[location].maxSockets) {
      links.push(this.fb.control({}));
    }
  }

  handleSlotChange(groupIndex: number) {
    // Remove gems over max socket count

    const gemGroup = this.gemGroups.at(groupIndex);

    const links = gemGroup.get('links') as FormArray;
    const location = gemGroup.get('location').value as string;

    const maxSockets = SlotInfo[location].maxSockets;

    while (links.length > maxSockets) {
      links.removeAt(links.length - 1);
    }
  }
}
