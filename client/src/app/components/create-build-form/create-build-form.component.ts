import { Component } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { Build, ClassCombos, SlotInfo, Slot } from '../../models/build';
import { Item, ItemType } from '../../models/Item';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ItemBrowserComponent } from '../item-browser/item-browser.component';
import { isTwoHanded } from '../../utilities/BuildUtilities';

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
    this.modalService.onHide.subscribe(reason => {
      if (reason === null) {
        const { slot, selectedItem } = this.itemBrowserRef.content;
        console.log(slot, selectedItem);
        this.updateItemInSlot(slot, selectedItem);
        // TODO: Update this.itemSlots to match the maximum number of sockets for the selected item
      }
    });
  }

  updateItemInSlot(slot: Slot, item: Item) {
    if (SlotInfo[slot].validItemTypes.includes(item.itemType)) {
      this.patchSlot(slot, item);

      switch (slot) {
        case Slot.WEAPON1:
          const weapon2 = this.items.get(Slot.WEAPON2).value as Item;
          if (
            isTwoHanded(item) &&
            weapon2.itemType &&
            (item.itemType !== ItemType.BOW ||
              (item.itemType === ItemType.BOW &&
                weapon2.itemType !== ItemType.QUIVER))
          ) {
            this.patchSlot(Slot.WEAPON2, {});
          }
          break;
        case Slot.WEAPON2:
          const weapon1 = this.items.get(Slot.WEAPON1).value as Item;
          if (
            isTwoHanded(weapon1) ||
            (item.itemType === ItemType.QUIVER &&
              weapon1.itemType !== ItemType.BOW)
          ) {
            this.patchSlot(Slot.WEAPON1, {});
          }
          break;
      }

      console.log(this.buildForm.value);
    }
  }

  patchSlot(slot: Slot, item: Item | {}) {
    this.buildForm.patchValue({
      items: {
        [slot]: item
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
        slot: slot
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