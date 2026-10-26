# TechOS Core (Sprint Express)

Sistema de gerenciamento de Ordens de Serviço aplicando Programação Orientada a Objetos e Padrões de Projeto Criacionais.

---

## 1. User Stories (INVEST)

* **US01:** "Como técnico, quero abrir uma Ordem de Serviço para registrar um conserto."
  * **C.A.01:** Deve validar o ID do cliente.
  * **C.A.02:** O status inicial deve ser sempre 'ABERTA'.

* **US02:** "Como cliente, quero visualizar o status do meu equipamento."
  * **C.A.01:** Deve exibir o ID da OS, descrição e status atual.
  * **C.A.02:** Apenas ordens vinculadas ao cliente autenticado devem ser retornadas.

---

## 2. Requisitos Não-Funcionais (RNF)

* **RNF01 (Segurança):** Sanitização e validação de inputs contra vulnerabilidades XSS e conformidade com diretrizes OWASP no cadastro de dados.
* **RNF02 (Desempenho):** O tempo de resposta na criação e busca de chamados deve ser inferior a 2 segundos (< 2s).

---

## 3. Diagrama de Classes POO

```mermaid
classDiagram
    class Usuario {
        <<abstract>>
        #id: int
        #nome: string
        #email: string
        +getId() int
        +getNome() string
        +getEmail() string
    }

    class Cliente {
        -telefone: string
        +getTelefone() string
    }

    class Tecnico {
        -especialidade: string
        +getEspecialidade() string
    }

    class OrdemServico {
        -id: int
        -cliente: Cliente
        -tecnico: Tecnico
        -status: string
        -descricao: string
        +getId() int
        +getCliente() Cliente
        +getStatus() string
        +setStatus(status: string) void
    }

    Usuario <|-- Cliente : Herança
    Usuario <|-- Tecnico : Herança
    OrdemServico o-- Cliente : Contém
    OrdemServico o-- Tecnico : Contém

# DOCUMENTAÇÃO DE UI/UX E COMPONENTES (SPRINT 3)

## 1. ARQUITETURA DA INFORMAÇÃO E DASHBOARD
- **Painel Superior:** Exibe totalizadores consumidos do GerenciadorOS (Singleton), apresentando contagens em tempo real.
- **Formulário Lateral:** Cadastra novos clientes e chamados acionando a UsuarioFactory de forma desacoplada.
- **Tabela Central:** Lista dinâmica e responsiva de Ordens de Serviço estilizada com CSS Grid e Flexbox.

## 2. COMPONENTES UI
- **StatusBadge:** Amarelo (ABERTA), Azul (EM ANDAMENTO) e Verde (CONCLUÍDA).
- **UserCard:** Exibe as iniciais do cliente em avatar e os dados de contacto.
- **MetricsCard:** Painéis com totais consolidados.

## 3. CHECKLIST DE ACESSIBILIDADE (WCAG)
- [x] Contraste mínimo de 4.5:1 nas tabelas e badges.
- [x] Navegação por TAB em todos os campos de formulário e botões de ação.
- [x] Rótulos ARIA (aria-label e aria-labelledby) para leitura de ecrã e alteração de status.

# DOCUMENTAÇÃO DE UI/UX E COMPONENTES (SPRINT 3)

## 1. ARQUITETURA DA INFORMAÇÃO E DASHBOARD
- **Painel Superior:** Exibe totalizadores consumidos do GerenciadorOS (Singleton), apresentando contagens em tempo real.
- **Formulário Lateral:** Cadastra novos clientes e chamados acionando a UsuarioFactory de forma desacoplada.
- **Tabela Central:** Lista dinâmica e responsiva de Ordens de Serviço estilizada com CSS Grid e Flexbox.

## 2. COMPONENTES UI
- **StatusBadge:** Amarelo (ABERTA), Azul (EM ANDAMENTO) e Verde (CONCLUÍDA).
- **UserCard:** Exibe as iniciais do cliente em avatar e os dados de contacto.
- **MetricsCard:** Painéis com totais consolidados.

## 3. CHECKLIST DE ACESSIBILIDADE (WCAG)
- [x] Contraste mínimo de 4.5:1 nas tabelas e badges.
- [x] Navegação por TAB em todos os campos de formulário e botões de ação.
- [x] Rótulos ARIA (aria-label e aria-labelledby) para leitura de ecrã e alteração de status.
