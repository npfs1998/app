import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcaoListaComponent } from './home/acao/acao-lista.component';
import { AcaoItemComponent } from './home/acao/item/acao-item.component';
import { HomeComponent } from './home/home.component';
import { UsuarioListaComponent } from './home/usuario/usuario-lista.component';
import { UsuarioItemComponent } from './home/usuario/item/usuario-item.component';
import { UsuarioCriarComponent } from './home/usuario/criar/usuario-criar.component';
import { LogComponent } from './home/compartilhado/log/log.component';
import { AcaoCriarComponent } from './home/acao/criar/acao-criar.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'home/acao', component: AcaoListaComponent },
  { path: 'home/acao/item', component: AcaoItemComponent },
  { path: 'home/acao/criar', component: AcaoCriarComponent },
  { path: 'home/usuario', component: UsuarioListaComponent },
  { path: 'home/usuario/item', component: UsuarioItemComponent },
  { path: 'home/usuario/criar', component: UsuarioCriarComponent },
  { path: 'home/compartilhado/log', component: LogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
