import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BuildsRoutingModule } from './builds.routing';
import { BuildService } from './services/build.service';
import { HomeComponent } from './pages/home/home.component';
import { BuildsComponent } from './builds.component';
import { CreateComponent } from './pages/create/create.component';
import { CreateBuildFormComponent } from './components/create-build-form/create-build-form.component';
import { KeysPipe } from './pipes/keys.pipe';
import { ValuesPipe } from './pipes/values.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, BuildsRoutingModule],
  declarations: [
    BuildsComponent,
    HomeComponent,
    CreateComponent,
    CreateBuildFormComponent,
    KeysPipe,
    ValuesPipe
  ],
  exports: [BuildsComponent],
  providers: [BuildService],
  bootstrap: [BuildsComponent]
})
export class BuildsModule {}
