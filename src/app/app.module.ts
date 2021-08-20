import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MenuComponent } from './menu-navbar/menu.component';
import { FooterComponent } from './footer/footer.component';
import { GeneralComponent } from './general/general.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AdminEditMenuComponent } from './admin-edit-menu/admin-edit-menu.component';
import {ReactiveFormsModule} from "@angular/forms";
import { MapComponent } from './map/map.component';
import { GalleryComponent } from './gallery/gallery.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    MenuComponent,
    FooterComponent,
    GeneralComponent,
    ContactsComponent,
    AdminEditMenuComponent,
    MapComponent,
    GalleryComponent,
    EditArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
