import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {MenuComponent} from "./menu-navbar/menu.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {GeneralComponent} from "./general/general.component";
import {ContactsComponent} from "./contacts/contacts.component";

const routes: Routes = [
  {path: '', component: GeneralComponent},
  {path: 'menu-navbar', component: MenuComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'admin-panel', component: AdminPanelComponent},

];

const adminRoutes: Routes = [

]

const routesLang: Routes = [

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
