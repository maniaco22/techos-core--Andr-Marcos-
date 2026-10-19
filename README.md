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
