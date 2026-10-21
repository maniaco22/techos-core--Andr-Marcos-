<?php

// ==========================================
// 1. CLASSE BASE ABSTRATA (Herança / POO)
// ==========================================
abstract class Usuario {
    protected int $id;
    protected string $nome;
    protected string $email;

    public function __construct(int $id, string $nome, string $email) {
        $this->id = $id;
        $this->nome = $nome;
        $this->email = $email;
    }

    public function getId(): int { return $this->id; }
    public function getNome(): string { return $this->nome; }
    public function getEmail(): string { return $this->email; }

    abstract public function getTipo(): string;
}

// ==========================================
// 2. SUBCLASSES ESPECIALIZADAS
// ==========================================
class Cliente extends Usuario {
    private string $telefone;

    public function __construct(int $id, string $nome, string $email, string $telefone = '') {
        parent::__construct($id, $nome, $email);
        $this->telefone = $telefone;
    }

    public function getTelefone(): string { return $this->telefone; }
    public function getTipo(): string { return "Cliente"; }
}

class Tecnico extends Usuario {
    private string $especialidade;

    public function __construct(int $id, string $nome, string $email, string $especialidade = 'Geral') {
        parent::__construct($id, $nome, $email);
        $this->especialidade = $especialidade;
    }

    public function getEspecialidade(): string { return $this->especialidade; }
    public function getTipo(): string { return "Técnico"; }
}

// ==========================================
// 3. PADRÃO CRIACIONAL: FACTORY METHOD
// ==========================================
class UsuarioFactory {
    public static function criar(string $tipo, int $id, string $nome, string $email, string $extra = ''): Usuario {
        return match (strtolower($tipo)) {
            'cliente' => new Cliente($id, $nome, $email, $extra),
            'tecnico' => new Tecnico($id, $nome, $email, $extra),
            default   => throw new InvalidArgumentException("Tipo de usuário inválido: $tipo")
        };
    }
}

// ==========================================
// 4. CLASSE DE ENTIDADE: ORDEM DE SERVIÇO
// ==========================================
class OrdemServico {
    private int $id;
    private Cliente $cliente;
    private ?Tecnico $tecnico;
    private string $descricao;
    private string $status;

    public function __construct(int $id, Cliente $cliente, string $descricao, ?Tecnico $tecnico = null) {
        $this->id = $id;
        $this->cliente = $cliente;
        $this->descricao = $descricao;
        $this->tecnico = $tecnico;
        $this->status = 'Aberta'; // Status inicial padronizado
    }

    public function atribuirTecnico(Tecnico $tecnico): void {
        $this->tecnico = $tecnico;
        $this->status = 'Em Andamento';
    }

    public function concluir(): void {
        $this->status = 'Concluída';
    }

    public function getDetalhes(): string {
        $nomeTecnico = $this->tecnico ? $this->tecnico->getNome() : 'Aguardando atribuição';
        return "[OS #{$this->id}] - Status: {$this->status} | Cliente: {$this->cliente->getNome()} | Técnico: {$nomeTecnico} | Descrição: {$this->descricao}";
    }
}

// ==========================================
// 5. PADRÃO CRIACIONAL: SINGLETON
// ==========================================
class GerenciadorOS {
    private static ?GerenciadorOS $instancia = null;
    /** @var OrdemServico[] */
    private array $ordens = [];

    private function __construct() {}
    private function __clone() {}
    public function __wakeup() {
        throw new Exception("Não é permitido desserializar um Singleton.");
    }

    public static function getInstancia(): GerenciadorOS {
        if (self::$instancia === null) {
            self::$instancia = new self();
        }
        return self::$instancia;
    }

    public function registrarOS(OrdemServico $os): void {
        $this->ordens[] = $os;
    }

    public function listarOrdens(): array {
        return $this->ordens;
    }
}

// ==========================================
// 6. EXECUÇÃO E TESTE DO SISTEMA
// ==========================================
$isCli = (php_sapi_name() === 'cli');
$quebra = $isCli ? PHP_EOL : "<br>";

if (!$isCli) {
    echo "<h2>--- TechOS Core - Sistema de Ordens de Serviço ---</h2>";
} else {
    echo "=== TechOS Core - Sistema de Ordens de Serviço ===" . PHP_EOL . PHP_EOL;
}

// Criando instâncias via Factory Method
$cliente1 = UsuarioFactory::criar('cliente', 1, 'Carlos Silva', 'carlos@email.com', '(81) 99999-1111');
$tecnico1 = UsuarioFactory::criar('tecnico', 2, 'André Marcos', 'andre@techos.com', 'Eletrônica e Redes');

// Criando e gerenciando as Ordens de Serviço
$os1 = new OrdemServico(101, $cliente1, 'Troca de conector de carga e reparo na placa.');
$os2 = new OrdemServico(102, $cliente1, 'Formatação e reinstalação de sistema operacional.');

// Atribuindo técnico à primeira OS
$os1->atribuirTecnico($tecnico1);

// Utilizando a instância única do GerenciadorOS (Singleton)
$gerenciador = GerenciadorOS::getInstancia();
$gerenciador->registrarOS($os1);
$gerenciador->registrarOS($os2);

// Exibindo os resultados registrados
foreach ($gerenciador->listarOrdens() as $os) {
    echo $os->getDetalhes() . $quebra;
}