import { createHash }  from 'crypto';

function encripta(texto: string) : string {
    let encripta1 = createHash('sha512').update(texto).digest('base64');
    let encripta2 = encripta1.substring(45, 100) + encripta1.substring(0, 45);
    return createHash('sha512').update(encripta2).digest('base64');
}