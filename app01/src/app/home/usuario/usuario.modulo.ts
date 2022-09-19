import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "../home.component";
import { UsuarioListaComponent } from "./usuario-lista.component";
import { UsuarioItemComponent } from "./item/usuario-item.component";
import { UsuarioCriarComponent } from "./criar/usuario-criar.component";

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: 'home', component: HomeComponent},
            {path: 'home/usuario', component: UsuarioListaComponent},
            {path: 'home/usuario/item', component: UsuarioItemComponent},
            {path: 'home/usuario/criar', component: UsuarioCriarComponent}
        ])
    ]
})
export class UsuarioModulo {}