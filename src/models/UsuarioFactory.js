import { Cliente, Tecnico } from './Usuario.js';

export class UsuarioFactory {
    static criar(tipo, id, nome, email, extra) {
        const tipoNormalizado = tipo.toLowerCase();
        if (tipoNormalizado === 'cliente') {
            console.log(`[FACTORY] Criando 'Cliente' via formulário UI -> ID: ${id}`);
            return new Cliente(id, nome, email, extra);
        } else if (tipoNormalizado === 'tecnico') {
            console.log(`[FACTORY] Criando 'Tecnico' via formulário UI -> ID: ${id}`);
            return new Tecnico(id, nome, email, extra);
        }
        throw new Error("Tipo de usuário inválido.");
    }
}
