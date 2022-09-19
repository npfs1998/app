import { Component, OnInit, Output } from '@angular/core';
import { Usuario } from '../compartilhado/dado/dado';
import { UsuarioServico } from '../compartilhado/dado/usuario.servico';
import { take } from 'rxjs/operators';
import { util } from 'src/app/util/util';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {
  _filterBy: string = '';
  _filterSituacaoBy: string = '';
  _usuarios: Usuario[] = [];
  usuarios: Usuario[] = [];
 
  constructor(private usuarioServico: UsuarioServico) { }

  ngOnInit(): void {
    this.getDados();
  }

  getDados() {

    var dados: string = util.dadosUsuario();
    dados = dados + ' - Logado desde: ' + util.horarioLoginUsuarioS();
    (document.getElementById('dadosUsuarioLU') as HTMLSpanElement).innerHTML = 'Usuário: ' + dados;

    this.usuarioServico.getAll()
    .pipe(
      take(1)
    )
    .subscribe(
      response => this.onSucess(response),
      error => this.onError(error)
    );
  }

  onSucess(response: Usuario[]) {
    this.usuarios = response;
    this._usuarios = response;
  }

  onError(error: any) {
    console.log('Erro ao carregar as usuários');
  }

  filtrar() {
    var radios = document.getElementsByName("filtro");
    if ((radios[1] as HTMLInputElement).checked)
      this.usuarios = this._usuarios.filter((usuario: Usuario) => usuario.nome.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
    else if ((radios[0] as HTMLInputElement).checked)
      this.usuarios = this._usuarios.filter((usuario: Usuario) => usuario.matricula.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);

    this.usuarios = this.usuarios.filter((usuario: Usuario) => 
      usuario.situacao.toLocaleLowerCase().indexOf(this._filterSituacaoBy.toLocaleLowerCase()) > -1);
  }
  set filter(value: string) {
    this._filterBy = value;
    this.filtrar();
  }

  get filter() {
    return this._filterBy;
  }

  situacaoFiltro(situacao: string){
    this._filterSituacaoBy = situacao;
    this.filtrar();
  }

}