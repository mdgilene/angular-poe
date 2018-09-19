import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Routing
import { ExileBuildsRoutingModule } from './exile-builds.routing';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { ExileBuildsComponent } from './exile-builds.component';

// Components
import { CreateComponent } from './pages/create/create.component';
import { CreateBuildFormComponent } from './components/create-build-form/create-build-form.component';
import { KeysPipe } from './pipes/keys.pipe';
import { ValuesPipe } from './pipes/values.pipe';
import { ItemBrowserComponent } from './components/item-browser/item-browser.component';
import { ItemControlComponent } from './components/item-control/item-control.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { GemBrowserComponent } from './components/gem-browser/gem-browser.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    ExileBuildsRoutingModule
  ],
  declarations: [
    ExileBuildsComponent,
    ItemBrowserComponent,
    GemBrowserComponent,
    HomeComponent,
    CreateComponent,
    CreateBuildFormComponent,
    KeysPipe,
    ValuesPipe,
    ItemControlComponent
  ],
  entryComponents: [ItemBrowserComponent, GemBrowserComponent],
  bootstrap: [ExileBuildsComponent]
})
export class ExileBuildsModule {}
