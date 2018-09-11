import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { BuildsRoutingModule } from "./builds.routing";
import { BuildService } from "./services/build.service";
import { HomeComponent } from "./pages/home/home.component";
import { BuildsComponent } from "./builds.component";
import { CreateComponent } from "./pages/create/create.component";
import { CreateBuildFormComponent } from "./components/create-build-form/create-build-form.component";
import { KeysPipe } from "./pipes/keys.pipe";
import { ValuesPipe } from "./pipes/values.pipe";
import { ItemBrowserComponent } from "./components/item-browser/item-browser.component";

@NgModule({
  imports: [CommonModule, FormsModule, NgbModule, BuildsRoutingModule],
  declarations: [
    BuildsComponent,
    ItemBrowserComponent,
    HomeComponent,
    CreateComponent,
    CreateBuildFormComponent,
    KeysPipe,
    ValuesPipe
  ],
  entryComponents: [ItemBrowserComponent],
  providers: [BuildService],
  exports: [BuildsComponent],
  bootstrap: [BuildsComponent]
})
export class BuildsModule {}
