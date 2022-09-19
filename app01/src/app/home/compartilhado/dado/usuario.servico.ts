import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, Perfil, LogAtividade } from './dado';
import { util } from 'src/app/util/util';


@Injectable({
    providedIn: 'root'
})

export class UsuarioServico {

    private apiUrl : string = util.apiUrl + '/usuario';// 'http://localhost:3000/usuario';

    constructor(private http: HttpClient) { }
  
    public post(usuario: Usuario): Observable<any> {
        return this.http.post(this.apiUrl, usuario);
    }    

    public getAll(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this.apiUrl);
    }

    public getById(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl + '/' + id}`);
    }

    public getByMatricula(id: string): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl + '/matricula/' + id}`);
    }

    public getBy(campos: string, valores: string): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${this.apiUrl + '/' + campos + '/' + valores}`);
    }    

    public put(id: number, usuario: Usuario): Observable<any> {
        //console.log(usuario, JSON.stringify(usuario));
        return this.http.put(`${this.apiUrl + '/' + id}`, usuario);
    }    

    public delete(id: number): Observable<Usuario> {
        return this.http.delete<Usuario>(`${this.apiUrl + '/' + id + ";" + util.idUsuario}`);
    }    

    public getPerfis(): Observable<Perfil[]> {
        return this.http.get<Perfil[]>(this.apiUrl + '/perfis');
    }

    public getLog(alvo: string, id: number): Observable<LogAtividade[]> {
        return this.http.get<LogAtividade[]>(this.apiUrl + '/log/' + alvo + '/' + id);
    }
}