import { Component, OnInit } from '@angular/core';
import { Usuario, Perfil } from '../../compartilhado/dado/dado';
import { UsuarioServico } from '../../compartilhado/dado/usuario.servico';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { util } from '../../../util/util';

@Component({
  selector: 'app-usuario-item',
  templateUrl: './usuario-item.component.html',
  styleUrls: ['./usuario-item.component.css']
})
export class UsuarioItemComponent implements OnInit {
  Id: number = 0;
  usuario! : Usuario;
  perfis: Perfil[] = [];
  temPerfilManterUsuario: boolean = true;
  registroAlterado: boolean = false;
  usuarioAtivo: boolean = false;
  habilitarBotoes: boolean = false;
  habilitarAtivar: boolean = false;


  constructor(private usuarioServico: UsuarioServico,
              private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.getParam();
    this.getDados();
    this.preencherPerfis();
    this.habilitacoes();
    util.setrotaAnterior('USUARIO' + ';' + this.Id);
  }

  habilitacoes() {
    this.habilitarBotoes = this.temPerfilManterUsuario && this.usuarioAtivo && !this.registroAlterado;
    this.habilitarAtivar = this.temPerfilManterUsuario && !this.usuarioAtivo && !this.registroAlterado;
  }

  preencherPerfis() {
    this.getPerfis();
  }

  alteracao() {
    this.registroAlterado = true;
    this.habilitacoes();
  }

  cancelar() {
   (document.getElementById('inputmatricula') as HTMLInputElement).value = this.usuario.matricula;
   (document.getElementById('inputnome') as HTMLInputElement).value = this.usuario.nome;
    this.registroAlterado = false;
    this.habilitacoes();
  }

  varrerPerfil() {
    var perfil: string = '';
    console.log(perfil);
    for(let i=0; i<this.perfis.length; i++) {
      let j = this.perfis[i].id;
      this.perfis[i].auxiliar = perfil[j] == '1';
    }
  };

  habilitarPerfis() {
    var perfil: string = this.usuario.perfil;
    if(perfil.length == 0) return;
    var selecao = (<unknown>document.getElementsByName('selPerfilUsuario')) as HTMLCollection;
    var n: number = 0;
    for(let i=0; i < selecao.length; i++) {
      var sel = <unknown>selecao[i] as HTMLOptionElement;
      n = parseFloat(sel.value);
      sel.selected = (perfil[n] == '1');
    }
  }

  getParam() {
    this.activatedRoute.queryParams.subscribe(
      (params: any) => {
        this.Id = params['nusuario'];}
  )}   

  getDados() {
    var dados: string = util.dadosUsuario();
    dados = dados + ' - Logado desde: ' + util.horarioLoginUsuarioS();
    (document.getElementById('dadosUsuarioIU') as HTMLSpanElement).innerHTML = 'Usuário: ' + dados;

    this.usuarioServico.getById(this.Id)
    .pipe(
      take(1)
    )
    .subscribe(
      response => this.onSucess(response),
      error => this.onError(error)
    );
  }

  onSucess(response: Usuario) {
    var _usuario: Usuario = response;
    this.usuario = (<Usuario[]><unknown>_usuario)[0];
    this.usuarioAtivo = (this.usuario!.situacao == "0");
    this.habilitacoes();
  }

  onError(error: any) {
    console.log('Erro ao carregar usuários', error);
  }

  modificacacoes(situacao: string) {

    if (situacao in ['0', '1', '2']) {
      var tipo: string = 'ativar';
      if (situacao == '1') tipo = 'bloquear';
      else if (situacao == '2') tipo = 'baixar';
      var mensagem: string = 'Confirma ' + tipo + ' o usuário ' + this.usuario.nome + '?';

      if (confirm(mensagem)) {
          this.alterarSituacao(situacao);
      }
    }
    else if (situacao == 's') {
      if (confirm('Confirma resetar senha do usuário' + this.usuario.nome + '?')) {
        this.resetarSenha();
      }
    }
  }

  alterarSituacao(situacao: string) {
    var _usuario = this.usuario;
    _usuario.situacao = situacao;
    this.usuarioAtivo = (situacao == "0");
    _usuario.modificador = util.idUsuario();
     this.putDados(_usuario);
    this.usuario = _usuario;
    this.habilitacoes();
  }

  resetarSenha() {
    var _usuario = this.usuario;
    _usuario.senha = 'padrao12345';
    _usuario.modificador = util.idUsuario();
     this.putDados(_usuario);
    this.usuario = _usuario;
  }

  salvar() {
    var _matricula: string = (document.getElementById('inputmatricula') as HTMLInputElement).value.toUpperCase();
    var _nome: string = (document.getElementById('inputnome') as HTMLInputElement).value.toUpperCase();
    var _usuario = this.usuario;
    var _perfil: string = this.verificarPerfil();
    _usuario.matricula = _matricula;
    _usuario.nome = _nome;
    _usuario.perfil = _perfil;
    _usuario.modificador = util.idUsuario();
     this.putDados(_usuario);
    this.usuario = _usuario;
    this.habilitacoes();
  }

  verificarPerfil() {
    var selecao = (<unknown>document.getElementsByName('selPerfilUsuario')) as HTMLCollection;
    var n: number = 0;
    var novoPerfil: string = this.usuario.perfil;
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

  putDados(_usuario: Usuario) {
    this.usuarioServico.put(this.Id, _usuario)
    .pipe(
      take(1)
    )
    .subscribe(
      response => this.onSucessPut(response),
      error => this.onErrorPut(error)
    );
  }

  onSucessPut(response: any) {
    alert('Usuário atualizado com sucesso');
  }

  onErrorPut(error: any) {
    alert('Erro ao alterar usuário: \n\n' +  error);
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

    var perfil: string = this.usuario!.perfil;
    for(let i=0; i<this.perfis.length; i++) {
      this.perfis[i].auxiliar = perfil[this.perfis[i].id] == '1';
    }
  }

  onErrorPerfil(error: any) {
    console.log('Erro ao carregar perfis', error);
  }
}

