import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
//import { FooterComponent } from "../compartilhado/footer/footer.component";
//import { HeaderComponent } from "../compartilhado/header/header.component";
//import { NavComponent } from "../compartilhado/nav/nav.component";
import { HomeComponent } from "../home.component";
//import { MenuComponent } from "../menu/menu.component";
import { UsuarioListaComponent } from "./usuario-lista.component";
import { UsuarioItemComponent } from "./item/usuario-item.component";

@NgModule({
    declarations: [
       // AcaoListaComponent,
        //AcaoItemComponent,
        //HomeComponent,
//        MenuComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: 'home', component: HomeComponent},
            {path: 'home/usuario', component: UsuarioListaComponent},
            {path: 'home/usuario/item', component: UsuarioItemComponent}
        ])
    ]
})
export class UsuarioModulo {}