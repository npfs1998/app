import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'usuarioSituacao'
})
export class UsuarioSituacaoPipe implements PipeTransform {
    transform(value: string) {
        const situacoes = ['Ativo', 'Bloqueado', 'Baixado'];
        const i: number = Number(value);
        return situacoes[i];
    }
}

@Pipe({
    name: 'usuarioPerfil'
})
export class UsuarioPerfilPipe implements PipeTransform {
    transform(value: string) {
        const perfis = ['Administrador', 'Criar/Manter Usuário', 'Visualizar Usuário', 
                        'Criar/Manter Ação', 'Visualizar Ação', 'Cancelar/Reabrir Ação'];
        var i: number = Number(value);
        if (i == 0) return 'Nenhum';
        const n: number = value.length;
        var retorno: string = '';
         for(let j: number = 0; j < n; j++) {
            i = Number(value[j]);
            if (i == 1) {
                if (retorno == '') retorno = perfis[j];
                else retorno = retorno + ', ' + perfis[j];
            }
        }
        return retorno;
    }
}