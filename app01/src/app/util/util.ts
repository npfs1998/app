import * as cyjs from 'crypto-js';

var perfil: string = '';
var logado: boolean = false;
var usuario: number = 0;
var matricula: string = '';
var nome: string = '';
var horario: Date;
var rotaAnterior: string = 'home';
var apiUrl : string = 'http://localhost:5000';

export class Util {

    public apiUrl:string = apiUrl;

    public horarioAtual(opcao: string): string{
        const data = new Date();
        const dia  = data.getDate().toString().padStart(2, '0');
        const mes  = (data.getMonth()+1).toString().padStart(2, '0'); 
        const ano  = data.getFullYear();
        
        const hora = data.getHours().toString().padStart(2, '0');          // 0-23
        const min  = data.getMinutes().toString().padStart(2, '0');        // 0-59
        const seg  = data.getSeconds().toString().padStart(2, '0');        // 0-59
    
        if (opcao == 'd')
            return dia+"/"+mes+"/"+ano;
        else if (opcao == 'h')
            return hora+":"+min+":"+seg;
        else
            return dia+"/"+mes+"/"+ano+" "+hora+":"+min+":"+seg;
    }
    
    public formataHorario(data: Date, opcao: string): string{
        const dia  = data.getDate().toString().padStart(2, '0');
        const mes  = (data.getMonth()+1).toString().padStart(2, '0'); 
        const ano  = data.getFullYear();
        
        const hora = data.getHours().toString().padStart(2, '0');          // 0-23
        const min  = data.getMinutes().toString().padStart(2, '0');        // 0-59
        const seg  = data.getSeconds().toString().padStart(2, '0');        // 0-59
    
        if (opcao == 'd')
            return dia+"/"+mes+"/"+ano;
        else if (opcao == 'h')
            return hora+":"+min+":"+seg;
        else
            return dia+"/"+mes+"/"+ano+" "+hora+":"+min+":"+seg;
    }
    
    public dataParaNumero(data: Date): number{
        const dia  = data.getDate().toString().padStart(2, '0');
        const mes  = (data.getMonth()+1).toString().padStart(2, '0'); 
        const ano  = data.getFullYear();
        
        const hora = data.getHours().toString().padStart(2, '0');          // 0-23
        const min  = data.getMinutes().toString().padStart(2, '0');        // 0-59
        const seg  = data.getSeconds().toString().padStart(2, '0');        // 0-59
    
        return parseFloat(ano+mes+dia);
    }

    public proximoDia(data: Date, dias: number): Date{
        var _ano: number = data.getFullYear();
        var _mes: number = data.getMonth();
        var _dia: number = data.getDate() + dias;
  
        if (dias > 0) {
            if ((_mes in [0, 2, 4, 6, 7, 9, 11] && _dia > 31) ||
                (_mes in [3, 5, 8, 10] && _dia > 30)) {
                _mes = _mes + 1;
                _dia = 1;
                if (_mes > 11) {
                    _mes = 0;
                    _ano = _ano + 1;
                }
            } else if(_mes == 1) {
                var _anoBisexto: boolean = this.anoBisexto(_ano);
                if ((_anoBisexto && _dia > 29) || (!_anoBisexto && _dia > 28)) {
                    if (_dia > 29) {
                        _mes = _mes + 1;
                        _dia = 1;
                    }
                }
            }
        } else if (dias < 0 && _dia < 0) {
            _mes = _mes - 1;
            if (_mes in [0, 2, 4, 6, 7, 9, 11]) _dia = 32 + dias;
            else if (_mes in [3, 5, 8, 10]) _dia = 31 + dias;
            else if(_mes == 1) {
                    var _anoBisexto: boolean = this.anoBisexto(_ano);
                    if (_anoBisexto) _dia = 30 + dias;
                    else _dia = 29 + dias;
            }
            if (_mes < 0) {
                _mes = 11;
                _ano = _ano - 1;
            }
        }
        return new Date(_ano, _mes, _dia);
    }

    public diaData(data: Date): Date{
        var _ano: number = data.getFullYear();
        var _mes: number = data.getMonth();
        var _dia: number = data.getDate();
        return new Date(_ano, _mes, _dia);
    }

    public anoBisexto(ano: number): boolean {
        return ((ano % 4 == 0) && ((ano % 100 != 0) || (ano % 400 == 0)));
    }

    public encripta(str: string) {
        let encripta1 = this.encriptar(str);
        let encripta2 = encripta1.substring(9, 36).trim() + 
        encripta1.substring(8, 28).trim() + 
        encripta1.substring(0, 10).trim() +
        encripta1.substring(25, 100).trim() +
        encripta1.substring(16, 64).trim();     
        encripta1 = this.encriptar(encripta2);
        return encripta1;
    };
    
    public encriptar(texto: string): string {
        return cyjs.SHA512(texto).toString(cyjs.enc.Base64);
    }

    public encriptarH(texto: string): string {
        return cyjs.DES.encrypt(texto, '123').toString();
    }

    public desencriptarH(texto: string): string {
        return cyjs.DES.decrypt(texto, '123').toString(cyjs.enc.Utf8);
    }

    public stringSubstituirCaracter(texto: string, posicao: number, novoCaracter: string) {
        return texto.substring(0,posicao) + 
                novoCaracter + 
                    texto.substring(posicao + 1, texto.length);
    }

    public atribuirPerfil(perfil1: string) {
        perfil = perfil1;
    }
    //'Administrador', 'Criar/Manter Usuário', 'Visualizar Usuário', 
    //'Criar/Manter Ação', 'Visualizar Ação', 'Cancelar/Reabrir Ação'
    
    public efetuarLogin(usuario1: number, matricula1: string, 
                           nome1: string, perfil1: string): void {
        usuario = usuario1;
        matricula = matricula1;
        nome = nome1;
        perfil = perfil1;
        logado = true;
        horario = new Date();
    }

    public setrotaAnterior(rota: string) {
        rotaAnterior = rota;
    }

    public getrotaAnterior(): string {
        return rotaAnterior;
    }

    public efetuarLogoff(): void {
        usuario = 0;
        matricula = '';
        nome = '';
        perfil = '';
        logado = false;
        horario = new Date();
    }

    public dadosUsuario() : string {
        return usuario + ' - ' + matricula + ' - ' + nome;
    }

    public idUsuario() : number {
        return usuario;
    }    

    public matriculaUsuario() : string {
        return matricula;
    }    

    public nomeUsuario() : string {
        return matricula;
    } 

    public horarioLoginUsuario() : Date {
        return horario;
    } 

    public horarioLoginUsuarioS() : string {
        return this.formataHorario(horario, '');
    }    

    public perfis(): string {
        return perfil;
    }

    public estaLogado(): boolean {
        return logado;
    }

    public perfilAdmin(): boolean {
        return perfil[0] == '1';
    }
    
    public perfilCriarUsuario(): boolean {
        return perfil[1] == '1';
    }
    
    public perfilVerUsuario(): boolean {
        return perfil[2] == '1';
    }
    
    public perfilCriarAcao(): boolean {
        return perfil[3] == '1';
    }
    
    public perfilVerAcao(): boolean {
        return perfil[4] == '1';
    }
    
    public perfilCancelarAcao(): boolean {
        return perfil[5] == '1';
    }
    
}

export var util = new Util();

/*
module.exports = {horarioAtual, perfis, atribuirPerfil,
    perfilAdmin, perfilCriarUsuario, perfilVerUsuario, 
    perfilCriarAcao, perfilVerAcao, perfilCancelarAcao};

*/