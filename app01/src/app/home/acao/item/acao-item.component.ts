import { Component, OnInit } from '@angular/core';
import { Acao } from '../../compartilhado/dado/dado';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AcaoServico } from '../../compartilhado/dado/acao.servico';
import { util } from 'src/app/util/util';

@Component({
  selector: 'app-acao-item',
  templateUrl: './acao-item.component.html',
  styleUrls: ['./acao-item.component.css']
})
export class AcaoItemComponent implements OnInit {
  Id: number = 0;
  acao! : Acao;
  temPerfilManterUsuario: boolean = true;// util.perfilCriarUsuario();
  registroAlterado: boolean = false;
  acaoAtivo: boolean = false;
  habilitarBotoes: boolean = false;
  habilitarAtivar: boolean = false;

  constructor(private acaoServico: AcaoServico,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParam();
    this.getDados();
    this.habilitacoes();
    util.setrotaAnterior('ACAO' + ';' + this.Id);
  }

  getParam() {
    this.activatedRoute.queryParams.subscribe(
      (params: any) => {
        this.Id = params['nacao'];}
  )}   

  habilitacoes() {
    this.habilitarBotoes = this.temPerfilManterUsuario && this.acaoAtivo && !this.registroAlterado;
    this.habilitarAtivar = this.temPerfilManterUsuario && !this.acaoAtivo && !this.registroAlterado;
  }

  alteracao() {
    this.registroAlterado = true;
    this.habilitacoes();
  }

  cancelar() {
    (document.getElementById('inputdescricao') as HTMLTextAreaElement).value = this.acao.descricao;
    (document.getElementById('inputobservacao') as HTMLTextAreaElement).value = this.acao.observacao;

    this.registroAlterado = false;
    this.habilitacoes();
    //location.reload();
  }
  
  getDados() {
    var dados: string = util.dadosUsuario();
    dados = dados + ' - Logado desde: ' + util.horarioLoginUsuarioS();
    (document.getElementById('dadosUsuarioIA') as HTMLSpanElement).innerHTML = 'Usuário: ' + dados;

    this.acaoServico.getById(this.Id)
    .pipe(
      take(1)
    )
    .subscribe(
      response => this.onSucess(response),
      error => this.onError(error)
    );
  }

  onSucess(response: Acao) {
    var _acao: Acao = response;
    this.acao = (<Acao[]><unknown>_acao)[0];
    this.acaoAtivo = (this.acao!.situacao == "0");
    this.habilitacoes();
  }

  onError(error: any) {
    console.log('Erro ao carregar ações', error);
  }

  modificacacoes(situacao: string) {

    if (situacao in ['0', '1', '2']) {
      var tipo: string = 'reativar';
      if (situacao == '1') tipo = 'finalizar';
      else if (situacao == '2') tipo = 'baixar';
      var mensagem: string = 'Confirma ' + tipo + ' a ação ' + this.acao.id + '?';

      if (confirm(mensagem)) {
          this.alterarSituacao(situacao);
      }
    }
  }

  alterarSituacao(situacao: string) {
    var _acao = this.acao;
    _acao.situacao = situacao;
    this.acaoAtivo = (situacao == "0");
    _acao.modificador = util.idUsuario();
     this.putDados(_acao);
    this.acao = _acao;
    this.habilitacoes();
  }

  salvar() {
    var _descricao: string = (document.getElementById('inputdescricao') as HTMLTextAreaElement).value.toUpperCase();
    var _observacao: string = (document.getElementById('inputobservacao') as HTMLTextAreaElement).value;
    var _acao = this.acao;
    _acao.descricao = _descricao;
    _acao.observacao = _observacao;
    _acao.modificador = util.idUsuario();
    this.putDados(_acao);
    this.acao = _acao;
    this.habilitacoes();
    //location.reload();
  }

  putDados(_acao: Acao) {
    this.acaoServico.put(this.Id, _acao)
    .pipe(
      take(1)
    )
    .subscribe(
      response => this.onSucessPut(response),
      error => this.onErrorPut(error)
    );
  }

  onSucessPut(response: any) {
    //console.log('Usuário atualizado com sucesso', response);
    alert('Ação atualizada com sucesso');
  }

  onErrorPut(error: any) {
    //console.log('Erro ao atualizar usuário', error);
    alert('Erro ao alterar ação: \n\n' +  error);
  }

}
