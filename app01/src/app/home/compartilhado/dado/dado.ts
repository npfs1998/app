export class Acao {
    id: number = 0;
    data!: Date;
    usuario: number = 0;
    descricao: string = '';
    observacao: string = '';
    situacao: string = '0';
    modificador: number = 0;
    matricula: string = '';
    nome: string = '';
}

export class Usuario {
    id: number = 0;
    matricula: string = '';
    nome: string = '';
    senha: string = '';
    situacao: string = '0';
    perfil: string = '';
    modificador: number = 0;    
}

export class Perfil {
    id: number = 0;
    descricao: string = '';
    auxiliar: boolean = false;
};

export class LogAtividade {
    id: number = 0;
    data!: Date;
    usuario: number = 0;
    idtabela: number = 0;
    tabela: string = '';
    acao: string = '';
    atividade: string = '';
    matricula: string = '';
    nome: string = '';
};