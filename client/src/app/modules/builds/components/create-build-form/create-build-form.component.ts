import { Component } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Build, ClassCombos, ItemSlots } from '../../models/build';
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
  itemSlots = ItemSlots;

  modalRef: BsModalRef;

  showWeapon2 = true;

  buildForm = this.fb.group({
    info: this.fb.group({
      name: ['', Validators.required],
      class: ['Pathfinder']
    }),
    items: this.fb.group({
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
    skills: this.fb.array([])
  });

  constructor(private modalService: BsModalService, private fb: FormBuilder) {
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
      skills: {
        discussion: '',
        gemGroups: form.skills
      }
    };
  }

  get skills(): FormArray {
    return this.buildForm.get('skills') as FormArray;
  }

  addSkillGroup() {
    this.skills.push(
      this.fb.group({
        slot: ['head'],
        gems: this.fb.array([])
      })
    );
  }

  addGem(group) {
    const skillGroup = this.skills.controls[group].get('gems') as FormArray;
    if (skillGroup.length < 6) {
      skillGroup.push(this.fb.control({}));
    }
  }
}
