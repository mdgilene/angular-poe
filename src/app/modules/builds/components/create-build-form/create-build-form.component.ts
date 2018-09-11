import { Component, OnInit } from "@angular/core";
import { Build, ClassCombos } from "../../models/Build";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ItemBrowserComponent } from "../item-browser/item-browser.component";

@Component({
  selector: "app-create-build-form",
  templateUrl: "./create-build-form.component.html",
  styleUrls: ["./create-build-form.component.css"]
})
export class CreateBuildFormComponent implements OnInit {
  model: Build;
  classCombos = ClassCombos;

  constructor(private modalService: NgbModal) {
    this.model = {
      name: "",
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

  openItemBrowser(e) {
    const modalRef = this.modalService.open(ItemBrowserComponent, {
      centered: true,
      size: "lg",
      windowClass: "custom-large-modal"
    });
    modalRef.componentInstance.slot = e.target.slot;
  }
}
