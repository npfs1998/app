import { Component, OnInit } from '@angular/core';
import { Usuario, Perfil } from '../../compartilhado/dado/dado';
import { UsuarioServico } from '../../compartilhado/dado/usuario.servico';
import { take } from 'rxjs/operators';
import { util } from '../../../util/util';

@Component({
  selector: 'app-usuario-criar',
  templateUrl: './usuario-criar.component.html',
  styleUrls: ['./usuario-criar.component.css']
})
export class UsuarioCriarComponent implements OnInit {
  perfis: Perfil[] = [];

  constructor(private usuarioServico: UsuarioServico ) { }

  ngOnInit(): void {
    this.getPerfis();

    var dados: string = util.dadosUsuario();
    dados = dados + ' - Logado desde: ' + util.horarioLoginUsuarioS();
    (document.getElementById('dadosUsuarioUC') as HTMLSpanElement).innerHTML = 'Usuário: ' + dados;

  }

  salvar() {
    var _matricula = (document.getElementById('matriculaC') as HTMLInputElement).value.toUpperCase();
    var _nome = (document.getElementById('nomeC') as HTMLInputElement).value.toUpperCase();
      
    var _usuario: Usuario = new Usuario();
    _usuario.matricula = _matricula;
    _usuario.nome = _nome;
    _usuario.senha = "padrao12345";
    _usuario.perfil = this.verificarPerfil();
    _usuario.modificador = util.idUsuario();
    this.postDados(_usuario);
  }

  verificarPerfil() {
    var selecao = (<unknown>document.getElementsByName('selPerfilUsuarioC')) as HTMLCollection;
    var n: number = 0;
    var novoPerfil: string = ''.padEnd(25, '0');
    for(let i=0; i < selecao.length; i++) {
      var sel = <unknown>selecao[i] as HTMLOptionElement;
      n = parseFloat(sel.value);
      if (sel.selected) 
        novoPerfil = util.stringSubstituirCaracter(novoPerfil, n, '1');
      else
        novoPerfil = util.stringSubstituirCaracter(novoPerfil, n, '0');
    }
    return novoPerfil;
  }

  postDados(_usuario: Usuario) {
    this.usuarioServico.post(_usuario)
    .pipe(
      take(1)
    )
    .subscribe(
      response => this.onSucessPost(response),
      error => this.onErrorPost(error)
    );
  }

  onSucessPost(response: any) {
    //console.log('Usuário incluído com sucesso', response);
    alert('Usuário incluído com sucesso');
  }

  onErrorPost(error: any) {
    //console.log('Erro ao incluir usuário', error);
    alert('Erro ao incluir usuário: \n\n' + error);
  }

  getPerfis() {
    this.usuarioServico.getPerfis()
    .pipe(
      take(1)
    )
    .subscribe(
      response => this.onSucessPerfil(response),
      error => this.onErrorPerfil(error)
    );
  }

  onSucessPerfil(response: Perfil[]) {
    var _perfil: Perfil[] = response;
    this.perfis = (<Perfil[]><unknown>_perfil);
  }

  onErrorPerfil(error: any) {
    console.log('Erro ao carregar perfis', error);
  }

}
