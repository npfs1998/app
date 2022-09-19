import { Component, OnInit } from '@angular/core';
import { util } from '../util/util';
import { UsuarioServico } from './compartilhado/dado/usuario.servico';
import { take } from 'rxjs/operators';
import { Usuario } from './compartilhado/dado/dado';
import { Event } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mensagem: string = '';
  usuario: any = null;

  constructor(private usuarioServico: UsuarioServico) { }
  
  ngOnInit(): void { 
    this.habilitarLogin();
  }

  habilitarLogin() {
    this.mensagem = '';
    (document.getElementById('key') as HTMLBodyElement).style.visibility = "hidden";
    var habilitar: boolean = !util.estaLogado();
    if(!habilitar) {
      (document.getElementById('loginusuario') as HTMLBodyElement).style.visibility = "hidden";
      (document.getElementById('habilitarLogoff') as HTMLButtonElement).style.visibility = 'visible';
      (document.getElementById('usuario') as HTMLButtonElement).style.visibility = 'visible';
      (document.getElementById('acao') as HTMLButtonElement).style.visibility = 'visible';
    }
    else {
      (document.getElementById('loginusuario') as HTMLBodyElement).style.visibility = "visible";
      (document.getElementById('habilitarLogoff') as HTMLButtonElement).style.visibility = 'hidden';
      (document.getElementById('usuario') as HTMLButtonElement).style.visibility = 'hidden';
      (document.getElementById('acao') as HTMLButtonElement).style.visibility = 'hidden';
      //if (this.verificaCaps()) this.mensagem = 'Caps Lock ativado!';
    }

    //(document.getElementById('habilitarLogin') as HTMLButtonElement).disabled = habilitar;
    
    if (!habilitar)
    {
      var dados: string = util.dadosUsuario();
      dados = dados + ' - Logado desde: ' + util.horarioLoginUsuarioS();
      (document.getElementById('dadosUsuario') as HTMLSpanElement).innerHTML = 'Usuário: ' + dados;
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  login()
  {
    var _matricula = (document.getElementById('matricula') as HTMLInputElement).value;
    var _senha = (document.getElementById('senha') as HTMLInputElement).value;
    this.getUsuario(_matricula);
    this.usuario = this.usuario;

    this.delay(300);
    if (!this.usuario)
    {
      this.delay(300);
      if (!this.usuario)
        this.getUsuario(_matricula);
        this.delay(300);
    }
    if (!this.usuario) {
      this.mensagem = "Tente novamente!";
      return;
    }
    var senhaok: boolean = true;
    var _sh = this.usuario.senha;

    if (this.usuario)
      senhaok = (util.encripta(_senha) == _sh);
    else {
      this.mensagem = "Usuário não encontrado!";
      return;
    }
    
    if (senhaok) 
    {
        this.mensagem = "Login efetuado com sucesso!";
        util.efetuarLogin(this.usuario.id, this.usuario.matricula,
          this.usuario.nome, this.usuario.perfil);

        this.habilitarLogin();
        this.mensagem = '';

    } else {
      if (!this.usuario)
          this.mensagem = "Matrícula e/ou a senha está(ão) errado(s)!"; 
      else
        this.mensagem = "Senha incorreta!"; 
    }
  }

  logoff() {
    util.efetuarLogoff();
    this.habilitarLogin();
    (document.getElementById('dadosUsuario') as HTMLSpanElement).innerHTML = '';
  }

  getUsuario(matricula: string) {
    this.usuarioServico.getByMatricula(matricula)
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
  }

  onError(error: any) {
    console.log('Erro ao carregar as usuários');
  }

  verificaCaps(): boolean {
    var key = 'a';
    (document.getElementById('key') as HTMLInputElement).value = 'a';
    var _key = (document.getElementById('key') as HTMLInputElement).value;
    return key != _key;
  };

  loginAdm(){
    var _matricula = "ADMIN";
    var _senha = "copadomundo";
    this.getUsuario(_matricula);
    this.delay(300);
    if (!this.usuario)
    {
      this.delay(300);
      if (!this.usuario)
        this.getUsuario(_matricula);
        this.delay(300);
    }
    if (!this.usuario) {
      this.mensagem = "Tente novamente!";
      return;
    }
    var senhaok: boolean = true;
    var _sh = this.usuario.senha;

    if (this.usuario)
      senhaok = (util.encripta(_senha) == _sh);
    else {
      this.mensagem = "Usuário não encontrado!";
      return;
    }
    
    if (senhaok) 
    {
        this.mensagem = "Login efetuado com sucesso!";
        util.efetuarLogin(this.usuario.id, this.usuario.matricula,
          this.usuario.nome, this.usuario.perfil);

        this.habilitarLogin();
        this.mensagem = '';

    } else {
      if (!this.usuario)
          this.mensagem = "Matrícula e/ou a senha está(ão) errado(s)!"; 
      else
        this.mensagem = "Senha incorreta!"; 
    }

  }
}