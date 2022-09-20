const cyjs = require('crypto');

function encripta(str) {
    let encripta1 = encriptar(str);
    let encripta2 = encripta1.substring(9, 36).trim() + 
    encripta1.substring(8, 28).trim() + 
    encripta1.substring(0, 10).trim() +
    encripta1.substring(25, 100).trim() +
    encripta1.substring(16, 64).trim();     
    encripta1 = encriptar(encripta2);
    return encripta1;
};

function encriptar(texto) {
    //return cyjs.SHA512(texto).toString(cyjs.enc.Base64);

    var hash = cyjs.createHash('sha512');

    var data = hash.update(texto, 'utf-8');

    return data.digest('base64');
}

function valida(texto) {
    var retorno = '';
    const v = 'A!B@C#D$F%H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6Y';
    const w = '/.,-*=$!$&(:?).#*!/)&*$)*@!.<>:;/=*-$#!-_+&';
    var j = 0;
    for(var i = 0; i < texto.length; i++) {
        j = texto.charCodeAt(i) - v.charCodeAt(i) - w.charCodeAt(i);
        retorno = retorno + String.fromCharCode(j);
    }
    return retorno;
}
/*
function encriptarH(texto) {
    return cyjs.DES.encrypt(texto, '123').toString();
}

function desencriptarH(texto) {
    return cyjs.DES.decrypt(texto, '123').toString(cyjs.enc.Utf8);
}
*/
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

module.exports = {encripta, horarioAtual, valida}; //, encriptarH, desencriptarH};
