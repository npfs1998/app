import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acao } from './dado';
import { util } from 'src/app/util/util';

/*
var acoes: Acao[] = [
{
    id: 1,
    data: '01/07/2022',
    usuario: 1,
    descricao: 'Teste 1',
    observacao: '',
    ativo: 0
},
{
    id: 2,
    data: '02/08/2022',
    usuario: 1,
    descricao: 'Teste 2',
    observacao: '',
    ativo: 0
},
{
    id: 3,
    data: '20/07/2022',
    usuario: 2,
    descricao: 'Teste 3',
    observacao: '',
    ativo: 0
}
];
*/

@Injectable({
    providedIn: 'root'
})

export class AcaoServico {
    private apiUrl : string = util.apiUrl + '/acao'; // 'http://localhost:3000/acao';

    constructor(private http: HttpClient) { }

    public post(acao: Acao): Observable<any> {
        return this.http.post(this.apiUrl, acao);
    }    

    public getAll(): Observable<Acao[]> {
      return this.http.get<Acao[]>(this.apiUrl);
    }

    public getById(id: number): Observable<Acao> {
        return this.http.get<Acao>(`${this.apiUrl + '/' + id}`);
    }

    public getBy(campos: string, valores: string): Observable<Acao[]> {
        return this.http.get<Acao[]>(`${this.apiUrl + '/' + campos + '/' + valores}`);
    }    

    public put(id: number, usuario: Acao): Observable<any> {
        return this.http.put(`${this.apiUrl + '/' + id}`, usuario);
    }    

    public delete(id: number): Observable<Acao> {
        return this.http.delete<Acao>(`${this.apiUrl + '/' + id + ";" + util.idUsuario}`);
    }    
}