export class OrdemServico {
    constructor(id, cliente, descricao, status = 'ABERTA') {
        this.id = id;
        this.cliente = cliente;
        this.tecnico = null;
        this.descricao = descricao;
        this.status = status;
        this.dataCriacao = new Date().toLocaleDateString('pt-BR');
    }

    atribuirTecnico(tecnico) {
        this.tecnico = tecnico;
        this.status = 'EM ANDAMENTO';
    }

    concluir() {
        this.status = 'CONCLUIDA';
    }
}

export class GerenciadorOS {
    static _instancia = null;

    constructor() {
        if (GerenciadorOS._instancia) {
            return GerenciadorOS._instancia;
        }
        this._ordens = [];
        GerenciadorOS._instancia = this;
        console.log("[SINGLETON] GerenciadorOS re-inicializado na View.");
    }

    static getInstance() {
        if (!GerenciadorOS._instancia) {
            GerenciadorOS._instancia = new GerenciadorOS();
        }
        return GerenciadorOS._instancia;
    }

    adicionarOS(os) {
        this._ordens.push(os);
    }

    listarTodas() {
        return [...this._ordens];
    }

    obterMetricas() {
        return {
            total: this._ordens.length,
            abertas: this._ordens.filter(o => o.status === 'ABERTA').length,
            emAndamento: this._ordens.filter(o => o.status === 'EM ANDAMENTO').length,
            concluidas: this._ordens.filter(o => o.status === 'CONCLUIDA').length
        };
    }
}
