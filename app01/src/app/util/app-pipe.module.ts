import { NgModule } from "@angular/core";
import { AcaoSituacaoPipe } from "./acao-situacao.pipe";
import { ReplacePipe } from './replace.pipe';
import { UsuarioSituacaoPipe, UsuarioPerfilPipe } from "./usuario-situacao.pipe";

@NgModule({
    declarations: [
        ReplacePipe,
        AcaoSituacaoPipe,
        UsuarioSituacaoPipe,
        UsuarioPerfilPipe],
    exports: [
        ReplacePipe,
        AcaoSituacaoPipe,
        UsuarioSituacaoPipe,
        UsuarioPerfilPipe
    ]
})
export class AppPipeModule {

}