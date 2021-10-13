import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {MenuComponent} from "./menu-navbar/menu.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {GeneralComponent} from "./general/general.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {AdminEditMenuComponent} from "./admin-edit-menu/admin-edit-menu.component";
import {MapComponent} from "./map/map.component";
import {GalleryComponent} from "./gallery/gallery.component";
import {EditArticleComponent} from "./edit-article/edit-article.component";
import {AdminFileEditComponent} from "./admin-file-edit/admin-file-edit.component";
import {AdminContactsComponent} from "./admin-contacts/admin-contacts.component";
import {AdminGalleryComponent} from "./admin-gallery/admin-gallery.component";
import {AdminNewsComponent} from "./admin-news/admin-news.component";
import {AdminBookComponent} from "./admin-book/admin-book.component";
import {LoginComponent} from "./login/login.component";
import {AdminUserPanelComponent} from "./admin-user-panel/admin-user-panel.component";

const routes: Routes = [
  {
    path: '', component: GeneralComponent, children: [
      {path: 'menu-navbar', component: MenuComponent},
      {path: 'footer', component: FooterComponent},
      {path: 'contacts', component: ContactsComponent},
      {path: 'map', component: MapComponent},
      {path: 'gallery', component: GalleryComponent},
      // {path: '**', redirectTo: '/'},
    ]
  },
  {
    path: 'admin-panel', component: AdminPanelComponent, children: [
      {path: 'admin-edit-menu', component: AdminEditMenuComponent},
      {path: 'edit-article', component: EditArticleComponent},
      {path: 'admin-file-edit', component: AdminFileEditComponent},
      {path: 'admin-contacts', component: AdminContactsComponent},
      {path: 'admin-gallery', component: AdminGalleryComponent},
      {path: 'admin-news', component: AdminNewsComponent},
      {path: 'admin-user-panel', component: AdminUserPanelComponent},
      {path: 'admin-book', component: AdminBookComponent},
    ]
  },
  {
    path: 'login', component: LoginComponent
  },

];

// const adminRoutes: Routes = [
//   {path: 'admin-panel', component: AdminPanelComponent},
//   {path: 'admin-panel', component: AdminPanelComponent},
// ]
const routesLang: Routes = []

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
