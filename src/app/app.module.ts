import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {MenuComponent} from './menu-navbar/menu.component';
import {FooterComponent} from './footer/footer.component';
import {GeneralComponent} from './general/general.component';
import {ContactsComponent} from './contacts/contacts.component';
import {AdminEditMenuComponent} from './admin-edit-menu/admin-edit-menu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MapComponent} from './map/map.component';
import {GalleryComponent} from './gallery/gallery.component';
import {EditArticleComponent} from './edit-article/edit-article.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {AdminFileEditComponent} from './admin-file-edit/admin-file-edit.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import { AdminContactsComponent } from './admin-contacts/admin-contacts.component';
import { AdminGalleryComponent } from './admin-gallery/admin-gallery.component';
import { LoginComponent } from './login/login.component';
import { AdminBookComponent } from './admin-book/admin-book.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AdminUserPanelComponent } from './admin-user-panel/admin-user-panel.component';
import { ArticleComponent } from './article/article.component';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { AdminFilialComponent } from './admin-filial/admin-filial.component';
import { SitePageComponent } from './site-page/site-page.component';
import { FilialComponent } from './filial/filial.component';

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
    AdminFileEditComponent,
    AdminContactsComponent,
    AdminGalleryComponent,
    AdminUserPanelComponent,
    AdminBookComponent,
    LoginComponent,
    ArticleComponent,
    AdminPagesComponent,
    AdminFilialComponent,
    SitePageComponent,
    FilialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
