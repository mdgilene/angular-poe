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
import { GemBrowserComponent } from '../gem-browser/gem-browser.component';

@Component({
  selector: 'exilebuilds-create-build-form',
  templateUrl: './create-build-form.component.html',
  styleUrls: ['./create-build-form.component.css']
})
export class CreateBuildFormComponent {
  ClassCombos = ClassCombos;
  Slot = Slot;
  SlotInfo = SlotInfo;

  itemBrowserRef: BsModalRef;
  gemBrowserRef: BsModalRef;

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
            [this.itemBrowserRef.content.slot]: this.itemBrowserRef.content
              .selectedItem
          }
        });

        // TODO: Update this.itemSlots to match the maximum number of sockets for the selected item
      }
    });
  }

  /**
   * Form submit
   */
  handleSubmit() {
    const build = this.formToModel();
    console.log(this.buildForm.status);
    console.log(build);
  }

  /**
   * Opens the item browser for the given slot.
   *
   * @param slot Slot that triggered this event
   */
  openItemBrowser(slot) {
    this.itemBrowserRef = this.modalService.show(ItemBrowserComponent, {
      initialState: {
        slot: slot,
        currentItems: this.buildForm.value.items
      },
      class: 'item-browser'
    });
  }

  openGemBrowser(group: number, index: number) {
    this.gemBrowserRef = this.modalService.show(GemBrowserComponent, {
      initialState: {
        currentLinks: this.gemGroups.at(group).get('links').value
      },
      class: 'item-browser'
    });
  }

  /**
   * Convert form value to Build model
   */
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

  /**
   * Items section
   */
  get items(): FormGroup {
    return this.buildForm.get('items') as FormGroup;
  }

  /**
   * The skills section list of gem groups.
   */
  get gemGroups(): FormArray {
    return this.buildForm.get('skills.gemGroups') as FormArray;
  }

  /**
   * Add a gem group to the skills section.
   */
  addGemGroup() {
    this.gemGroups.push(
      this.fb.group({
        location: ['head'],
        links: this.fb.array([])
      })
    );
  }

  /**
   * Adds a gem slot to the provided group.
   *
   * @param group index of the group to add a gem slot to
   */
  addGem(group) {
    const skillGroup = this.gemGroups.at(group) as FormGroup;
    const location = skillGroup.get('location').value as string;
    const links = skillGroup.get('links') as FormArray;
    if (links.length < SlotInfo[location].maxSockets) {
      links.push(this.fb.control({}));
    }
  }

  /**
   * Handle gemGroup slot change.
   *
   * Removes gems over the maximum socket count for that slot.
   *
   * @param groupIndex index of the group that changed
   */
  handleSlotChange(groupIndex: number) {
    const gemGroup = this.gemGroups.at(groupIndex);

    const links = gemGroup.get('links') as FormArray;
    const location = gemGroup.get('location').value as string;

    const maxSockets = SlotInfo[location].maxSockets;

    while (links.length > maxSockets) {
      links.removeAt(links.length - 1);
    }
  }
}
