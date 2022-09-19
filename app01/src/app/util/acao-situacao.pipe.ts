import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'acaoSituacao'
})
export class AcaoSituacaoPipe implements PipeTransform {
    transform(value: string) {
        const situacoes = ['Em aberto', 'Finalizado', 'Cancelado', 'Reaberto'];
        const i: number = Number(value);
        return situacoes[i];
    }
}