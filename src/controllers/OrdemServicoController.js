import { UsuarioFactory } from '../models/UsuarioFactory.js';
import { OrdemServico, GerenciadorOS } from '../models/GerenciadorOS.js';

export class OrdemServicoController {
    constructor() {
        this.gerenciador = GerenciadorOS.getInstance();
        this.tabelaCorpo = document.getElementById('corpo-tabela-os');
        this.form = document.getElementById('form-abertura-os');
        this.totalAbertas = document.getElementById('metric-abertas');
        this.totalAndamento = document.getElementById('metric-andamento');
        this.totalConcluidas = document.getElementById('metric-concluidas');
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleCriarOS(e));
        this.render();
    }

    handleCriarOS(evento) {
        evento.preventDefault();
        console.log("[CONTROLLER] Evento submit capturado com sucesso.");

        const nome = document.getElementById('cliente-nome').value;
        const email = document.getElementById('cliente-email').value;
        const telefone = document.getElementById('cliente-telefone').value;
        const descricao = document.getElementById('os-descricao').value;

        const idNovo = Date.now().toString().slice(-4);
        const cliente = UsuarioFactory.criar('cliente', idNovo, nome, email, telefone);
        const novaOS = new OrdemServico(idNovo, cliente, descricao, 'ABERTA');

        this.gerenciador.adicionarOS(novaOS);

        if (window.Toastify) {
            Toastify({
                text: `[BIBLIOTECA] Ordem de Serviço #${novaOS.id} criada com sucesso!`,
                duration: 3000,
                gravity: "top",
                position: "right",
                style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
            }).showToast();
        }

        console.log(`[BIBLIOTECA] Toastify exibido: "Ordem de Serviço #${novaOS.id} criada com sucesso!".`);
        this.form.reset();
        this.render();
    }

    render() {
        console.log("[VIEW] Tabela de OS atualizada dinamicamente com Flexbox/Grid.");
        const ordens = this.gerenciador.listarTodas();
        const metricas = this.gerenciador.obterMetricas();

        this.totalAbertas.textContent = metricas.abertas;
        this.totalAndamento.textContent = metricas.emAndamento;
        this.totalConcluidas.textContent = metricas.concluidas;

        this.tabelaCorpo.innerHTML = '';

        if (ordens.length === 0) {
            this.tabelaCorpo.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:1.5rem; color:#64748b;">Nenhuma ordem registrada no momento.</td></tr>`;
            return;
        }

        ordens.forEach(os => {
            const tr = document.createElement('tr');
            const badgeClass = os.status === 'ABERTA' ? 'badge-aberta' : (os.status === 'EM ANDAMENTO' ? 'badge-andamento' : 'badge-concluida');
            tr.innerHTML = `
                <td><strong>#${os.id}</strong></td>
                <td>
                    <div class="user-card-cell">
                        <span class="user-avatar">${os.cliente.getNome().charAt(0)}</span>
                        <div>
                            <div>${os.cliente.getNome()}</div>
                            <small class="user-sub">${os.cliente.getEmail()}</small>
                        </div>
                    </div>
                </td>
                <td>${os.descricao}</td>
                <td><span class="status-badge ${badgeClass}">${os.status}</span></td>
                <td>
                    <button class="btn-action" aria-label="Alterar status da OS #${os.id}" onclick="window.controller.alterarStatus('${os.id}')">
                        Avançar
                    </button>
                </td>
            `;
            this.tabelaCorpo.appendChild(tr);
        });
    }

    alterarStatus(id) {
        const os = this.gerenciador.listarTodas().find(item => item.id === id);
        if (os) {
            if (os.status === 'ABERTA') {
                os.status = 'EM ANDAMENTO';
            } else if (os.status === 'EM ANDAMENTO') {
                os.status = 'CONCLUIDA';
            }
            this.render();
        }
    }
}
