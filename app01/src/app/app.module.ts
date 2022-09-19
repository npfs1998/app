import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { AcaoModulo } from './home/acao/acao.modulo';
import { AppPipeModule } from './util/app-pipe.module';
import { UsuarioModulo } from './home/usuario/usuario.modulo';
import { UsuarioListaComponent } from './home/usuario/usuario-lista.component';
import { UsuarioItemComponent } from './home/usuario/item/usuario-item.component';
import { UsuarioCriarComponent } from './home/usuario/criar/usuario-criar.component';
import { LogComponent } from './home/compartilhado/log/log.component';
import { AcaoItemComponent } from './home/acao/item/acao-item.component';
import { AcaoListaComponent } from './home/acao/acao-lista.component';
import { AcaoCriarComponent } from './home/acao/criar/acao-criar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsuarioListaComponent,
    UsuarioItemComponent,
    UsuarioCriarComponent,
    LogComponent,
    AcaoItemComponent,
    AcaoListaComponent,
    AcaoCriarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AcaoModulo,
    UsuarioModulo,
    HttpClientModule,
    MatTooltipModule,
    AppPipeModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
