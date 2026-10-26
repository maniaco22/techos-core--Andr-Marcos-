export class Usuario {
    constructor(id, nome, email) {
        if (new.target === Usuario) {
            throw new Error("A classe Usuario é abstrata e não pode ser instanciada diretamente.");
        }
        this._id = id;
        this._nome = nome;
        this._email = email;
    }

    getId() { return this._id; }
    getNome() { return this._nome; }
    getEmail() { return this._email; }
}

export class Cliente extends Usuario {
    constructor(id, nome, email, telefone) {
        super(id, nome, email);
        this._telefone = telefone;
    }

    getTelefone() { return this._telefone; }
}

export class Tecnico extends Usuario {
    constructor(id, nome, email, especialidade) {
        super(id, nome, email);
        this._especialidade = especialidade;
    }

    getEspecialidade() { return this._especialidade; }
}
