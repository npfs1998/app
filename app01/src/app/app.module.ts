import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AcaoItemComponent } from './home/acao/item/acao-item.component';
import { AcaoListaComponent } from './home/acao/acao-lista.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './home/menu/menu.component';
import { HeaderComponent } from './home/compartilhado/header/header.component';
import { NavComponent } from './home/compartilhado/nav/nav.component';
import { FooterComponent } from './home/compartilhado/footer/footer.component';
import { AcaoModulo } from './home/acao/acao.modulo';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppPipeModule } from './util/app-pipe.module';
import { UsuarioModulo } from './home/usuario/usuario.modulo';
import { UsuarioListaComponent } from './home/usuario/usuario-lista.component';
import { UsuarioItemComponent } from './home/usuario/item/usuario-item.component';
import { UsuarioCriarComponent } from './home/usuario/criar/usuario-criar.component';
import { LogComponent } from './home/compartilhado/log/log.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AcaoCriarComponent } from './home/acao/criar/acao-criar.component';

@NgModule({
  declarations: [
    AppComponent,
    AcaoItemComponent,
    AcaoListaComponent,
    MenuComponent,
    HomeComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    UsuarioListaComponent,
    UsuarioItemComponent,
    UsuarioCriarComponent,
    LogComponent,
    AcaoCriarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AcaoModulo,
    UsuarioModulo,
    HttpClientModule,
    AppPipeModule,
    MatTooltipModule

  /*  RouterModule.forRoot([{path: '', redirectTo: 'home', pathMatch: 'full'},
                          {path: 'acao', component: AcaoListaComponent},
                          {path: 'acao/item/:id', redirectTo: 'acao/item/:id', pathMatch: 'full'}]) */
  ],
  providers: [ HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
