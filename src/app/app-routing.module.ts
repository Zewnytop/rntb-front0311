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
import {AdminBookComponent} from "./admin-book/admin-book.component";
import {LoginComponent} from "./login/login.component";
import {AdminUserPanelComponent} from "./admin-user-panel/admin-user-panel.component";
import {ArticleComponent} from "./article/article.component";
import {AdminPagesComponent} from "./admin-pages/admin-pages.component";
import {SitePageComponent} from "./site-page/site-page.component";
import {AdminFilialComponent} from "./admin-filial/admin-filial.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {AdminParameterComponent} from "./admin-parameter/admin-parameter.component";
import {ArticleOpenComponent} from "./article-open/article-open.component";

const pages: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'sp/:id', component: SitePageComponent},
  {path: 'ap/:id1/:id2', component: ArticleOpenComponent},
];

const admin: Routes = [
  {path: 'admin-edit-menu', component: AdminEditMenuComponent},
  {path: 'edit-article', component: EditArticleComponent},
  {path: 'admin-file-edit', component: AdminFileEditComponent},
  {path: 'admin-contacts', component: AdminContactsComponent},
  {path: 'admin-gallery', component: AdminGalleryComponent},
  {path: 'user-panel', component: AdminUserPanelComponent},
  {path: 'admin-book', component: AdminBookComponent},
  {path: 'pages', component: AdminPagesComponent},
  {path: 'filial', component: AdminFilialComponent},
  {path: 'parameter', component: AdminParameterComponent}
];

const routes: Routes = [
  {path: '', component: GeneralComponent, children: pages},
  {path: 'admin-panel', component: AdminPanelComponent, children: admin},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: ''}
];


@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
