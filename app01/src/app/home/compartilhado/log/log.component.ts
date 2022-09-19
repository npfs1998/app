import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioServico } from '../../compartilhado/dado/usuario.servico';
import { take } from 'rxjs/operators';
import { LogAtividade } from '../dado/dado';
import { util } from 'src/app/util/util';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  alvo: string = '';
  Id: number = 0;
  rotaAnterior: string = util.getrotaAnterior();
  logAtividade: LogAtividade[] = [];

  constructor(private usuarioServico: UsuarioServico,
              private activatedRoute: ActivatedRoute) { 
              }

  ngOnInit(): void {
    this.rotaAnterior = util.getrotaAnterior();
    //console.log(this.rotaAnterior);
    //this.getParam();
    var s = this.rotaAnterior.split(';');
    this.alvo = s[0];
    this.Id = parseFloat(s[1]);
    //console.log(this.alvo, this.Id);
    //this.getLog();
  }

  getParam() {
    this.activatedRoute.queryParams.subscribe(
      (params: any) => {
        this.alvo = params['alvo'];
        this.Id = params['id'];}
  )}   

  getLog() {
    this.usuarioServico.getLog(this.alvo, this.Id)
    .pipe(
      take(1)
    )
    .subscribe(
      response => this.onSucessLog(response),
      error => this.onErrorLog(error)
    );
  }

  onSucessLog(response: LogAtividade[]) {
    var _perfil: LogAtividade[] = response;
    this.logAtividade = (<LogAtividade[]><unknown>_perfil);
  }

  onErrorLog(error: any) {
    console.log('Erro ao carregar log', error);
  }

  exibir() {
    this.getLog();
  }

}
