import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
//import { FooterComponent } from "../compartilhado/footer/footer.component";
//import { HeaderComponent } from "../compartilhado/header/header.component";
//import { NavComponent } from "../compartilhado/nav/nav.component";
import { HomeComponent } from "../home.component";
//import { MenuComponent } from "../menu/menu.component";
import { AcaoListaComponent } from "./acao-lista.component";
import { AcaoItemComponent } from "./item/acao-item.component";

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
            {path: 'home/acao', component: AcaoListaComponent},
            {path: 'home/acao/item/:id', component: AcaoItemComponent}
        ])
    ]
})
export class AcaoModulo {}