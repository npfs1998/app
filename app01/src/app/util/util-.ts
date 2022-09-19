import { createHash }  from 'crypto';

interface IUtil {
    encripta(texto: string): string;
    horarioAtual(opcao: string): string
}

export class Util implements IUtil{
    encripta(texto: string): string {
    let encripta1 = createHash('sha512').update(texto).digest('base64');
    let encripta2 = encripta1.substring(9, 36).trim() + 
                    encripta1.substring(25, 100).trim() + 
                    encripta1.substring(0, 49).trim() +
                    encripta1.substring(36, 81).trim() +
                    encripta1.substring(16, 64).trim();
    return createHash('sha512').update(encripta2).digest('base64');
    };
    horarioAtual(opcao: string): string {
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
}

export function horarioAtual(opcao: string): string {
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

var perfil: string = '';

export function atribuirPerfil(perfil1: string) {
    perfil = perfil1;
}
//'Administrador', 'Criar/Manter Usuário', 'Visualizar Usuário', 
//'Criar/Manter Ação', 'Visualizar Ação', 'Cancelar/Reabrir Ação'

export function perfilAdmin(): boolean {
    return perfil[0] == '1';
}

export function perfilCriarUsuario(): boolean {
    return perfil[1] == '1';
}

export function perfilVerUsuario(): boolean {
    return perfil[2] == '1';
}

export function perfilCriarAcao(): boolean {
    return perfil[3] == '1';
}

export function perfilVerAcao(): boolean {
    return perfil[4] == '1';
}

export function perfilCancelarAcao(): boolean {
    return perfil[5] == '1';
}

module.exports = {horarioAtual, atribuirPerfil,
    perfilAdmin, perfilCriarUsuario, perfilVerUsuario, 
    perfilCriarAcao, perfilVerAcao, perfilCancelarAcao};
