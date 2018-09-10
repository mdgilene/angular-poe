import { Component, OnInit } from '@angular/core';
import { Build, ClassCombos } from '../../models/Build';

@Component({
  selector: 'app-create-build-form',
  templateUrl: './create-build-form.component.html',
  styleUrls: ['./create-build-form.component.css']
})
export class CreateBuildFormComponent implements OnInit {
  model: Build;
  classCombos = ClassCombos;

  constructor() {
    this.model = {
      name: '',
      class: {}
    };
  }

  ngOnInit() {}

  handleSubmit() {
    this.model.class.primary = ClassCombos.find(c =>
      c.secondary.includes(this.model.class.secondary)
    ).primary;
    console.log(this.model);
  }
}
