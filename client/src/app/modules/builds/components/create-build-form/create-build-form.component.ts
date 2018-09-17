import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Build, ClassCombos } from '../../models/build';
import { WeaponType } from '../../models/item';

@Component({
  selector: 'app-create-build-form',
  templateUrl: './create-build-form.component.html',
  styleUrls: ['./create-build-form.component.css']
})
export class CreateBuildFormComponent implements OnInit {
  model: Build;
  classCombos = ClassCombos;

  showWeapon2 = true;

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

  constructor() {
    this.model = {
      name: '',
      class: {}
    };

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
  }

  ngOnInit() {}

  handleSubmit() {
    // this.model.class.primary = ClassCombos.find(c =>
    //   c.secondary.includes(this.model.class.secondary)
    // ).primary;
    // console.log(this.model);
    console.log(this.buildForm.value);
  }
}
