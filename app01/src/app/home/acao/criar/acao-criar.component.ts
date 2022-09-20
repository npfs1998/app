import { Component, OnInit } from '@angular/core';
import { Acao } from '../../compartilhado/dado/dado';
import { AcaoServico } from '../../compartilhado/dado/acao.servico';
import { take } from 'rxjs/operators';
import { util } from '../../../util/util';

@Component({
  selector: 'app-acao-criar',
  templateUrl: './acao-criar.component.html',
  styleUrls: ['./acao-criar.component.css']
})
export class AcaoCriarComponent implements OnInit {

  constructor(private acaoServico: AcaoServico ) { }

  ngOnInit(): void {
    var dados: string = util.dadosUsuario();
    dados = dados + ' - Logado desde: ' + util.horarioLoginUsuarioS();
    (document.getElementById('dadosUsuarioAC') as HTMLSpanElement).innerHTML = 'Usuário: ' + dados;

  }

  salvar() {
    var _descricao: string = (document.getElementById('inputdescricaoC') as HTMLTextAreaElement).value.toUpperCase();
    var _observacao: string = (document.getElementById('inputobservacaoC') as HTMLTextAreaElement).value;

    var _acao: Acao = new Acao();
    _acao.usuario = util.idUsuario();
    _acao.descricao = _descricao;
    _acao.observacao = _observacao;
    _acao.modificador = util.idUsuario();
    _acao.matricula = util.matriculaUsuario();
    _acao.nome = util.nomeUsuario();
    this.postDados(_acao);
  }

  postDados(_acao: Acao) {
    this.acaoServico.post(_acao)
    .pipe(
      take(1)
    )
    .subscribe(
      response => this.onSucessPost(response),
      error => this.onErrorPost(error)
    );
  }

  onSucessPost(response: any) {
    alert('Ação incluída com sucesso');
  }

  onErrorPost(error: any) {
    alert('Erro ao incluir ação: \n\n' + error);
  }

}
