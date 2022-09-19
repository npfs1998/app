//const crypto = require('crypto');
/*
function encripta(texto) {
    let encripta1 = crypto.createHash('sha512').update(texto).digest('base64');
    let encripta2 = encripta1.substring(9, 36).trim() + 
                    encripta1.substring(25, 100).trim() + 
                    encripta1.substring(0, 49).trim() +
                    encripta1.substring(36, 81).trim() +
                    encripta1.substring(16, 64).trim();
    return crypto.createHash('sha512').update(encripta2).digest('base64');
}*/

function horarioAtual(opcao){
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

perfil = '';

function atribuirPerfil(perfil) {
    this.perfil = perfil;
    return this.perfil = perfil;
}
//'Administrador', 'Criar/Manter Usuário', 'Visualizar Usuário', 
//'Criar/Manter Ação', 'Visualizar Ação', 'Cancelar/Reabrir Ação'

function perfilAdmin() {
    return this.perfil[0] == '1';
}

function perfilCriarUsuario() {
    return this.perfil[1] == '1';
}

function perfilVerUsuario() {
    return this.perfil[2] == '1';
}

function perfilCriarAcao() {
    return this.perfil[3] == '1';
}

function perfilVerAcao() {
    return this.perfil[4] == '1';
}

function perfilCancelarAcao() {
    return this.perfil[5] == '1';
}

module.exports = {encripta, horarioAtual, atribuirPerfil,
    perfilAdmin, perfilCriarUsuario, perfilVerUsuario, 
    perfilCriarAcao, perfilVerAcao, perfilCancelarAcao};
