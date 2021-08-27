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
    path: 'login', component: AdminPanelComponent, children: [
      {path: 'admin-edit-menu', component: AdminEditMenuComponent},
      {path: 'edit-article', component: EditArticleComponent},
      {path: 'admin-file-edit', component: AdminFileEditComponent},

    ]
  },

];

// const adminRoutes: Routes = [
//   {path: 'admin-panel', component: AdminPanelComponent},
//   {path: 'admin-panel', component: AdminPanelComponent},
// ]
const routesLang: Routes = []

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
