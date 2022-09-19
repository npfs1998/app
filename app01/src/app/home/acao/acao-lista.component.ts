import { Component, OnInit, Output } from '@angular/core';
import { Acao } from '../compartilhado/dado/dado';
import { AcaoServico } from '../compartilhado/dado/acao.servico';
import { take } from 'rxjs/operators';
import { util } from 'src/app/util/util';

@Component({
  selector: 'app-acao-lista',
  templateUrl: './acao-lista.component.html',
  styleUrls: ['./acao-lista.component.css']
})
export class AcaoListaComponent implements OnInit {
  _filterBy: string = '';
  _filterSituacaoBy: string = '';
  _acoes: Acao[] = [];
  acoes: Acao[] = [];

  constructor(private acaoServico: AcaoServico) { }

  ngOnInit(): void {
    this.getDados();
    (document.getElementById("datainicio") as HTMLInputElement).valueAsDate = util.diaData(new Date());
    (document.getElementById("datafim") as HTMLInputElement).valueAsDate = util.diaData(new Date());
  }
   
  getDados() {
    var dados: string = util.dadosUsuario();
    dados = dados + ' - Logado desde: ' + util.horarioLoginUsuarioS();
    (document.getElementById('dadosUsuarioLA') as HTMLSpanElement).innerHTML = 'Usuário: ' + dados;

    this.acaoServico.getAll()
    .pipe(
      take(1)
    )
    .subscribe(
      response => this.onSucess(response),
      error => this.onError(error)
    );
  }

  onSucess(response: Acao[]) {
    this.acoes =  response;
    this._acoes = response;
  }

  onError(error: any) {
    console.log('Erro ao carregar as ações');
  }

  filtrar() {
    var radios = document.getElementsByName("filtroA");
    if ((radios[1] as HTMLInputElement).checked)
      this.acoes = this._acoes.filter((acao: Acao) => acao.nome.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
    else if ((radios[0] as HTMLInputElement).checked)
      this.acoes = this._acoes.filter((acao: Acao) => acao.matricula.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
    else if ((radios[2] as HTMLInputElement).checked)
      this.acoes = this._acoes.filter((acao: Acao) => acao.descricao.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
    else if ((radios[3] as HTMLInputElement).checked)
      this.acoes = this._acoes.filter((acao: Acao) => acao.observacao.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);

    this.acoes = this.acoes.filter((acao: Acao) => 
      acao.situacao.toLocaleLowerCase().indexOf(this._filterSituacaoBy.toLocaleLowerCase()) > -1);

    this.filtrarPeriodo();
  }

  filtrarPeriodo(){
    var checkdataA = document.getElementById("checkdataA") as HTMLInputElement;
    if (!checkdataA.checked) return;

    var _aux: Acao[] = [];
    var acao: Acao;
    var datainicio = document.getElementById("datainicio") as HTMLInputElement;
    var datafim = document.getElementById("datafim") as HTMLInputElement;
    var dataInicio: Date = util.proximoDia(datainicio.valueAsDate!, 1);
    var dataFim: Date = util.proximoDia(datafim.valueAsDate!, 2);

    var i: number = 0;
    var N: number = this.acoes.length;

    for(i = 0; i < N; i++)
    {
      acao = this.acoes[i];
      var _data: Date = new Date(acao.data);

      if(_data >= dataInicio && _data < dataFim)
        _aux.push(acao);
    }

    this.acoes = _aux;
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