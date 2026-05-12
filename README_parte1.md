# Tarefa 1.1: Proposta de Aplicação

O sistema "Boca de Fumo - Senhor Vitor" resolve o problema logístico e de gestão de estoque de uma rede de distribuição de drogas ilícitas. A aplicação visa garantir o registro preciso das cargas em estoque e o despache seguro de novas transações, evitando perdas de mercadoria e calculando as baixas de massa em tempo real. O usuário principal é o Organizador/Administrador (Drug Dealer) da operação. As duas entidades de dados centrais da aplicação são o **Produto** (mercadoria em estoque) e a **Venda** (registro da operação de despache).

---

# Tarefa 1.2: Modelagem dos Dados Mockados

Abaixo está o esquema JSON estruturado para as duas entidades principais do sistema:

```json
// Esquema da Entidade: Produto
{
  "id": "string", // Identificador único do lote ou produto
  "nome": "string", // Nomenclatura comercial da substância
  "quantidade": "number", // Quantidade total de massa em estoque (em gramas)
  "pureza_percentual": "number", // Nível de pureza química (0 a 100)
  "fornecedor": "string" // Nome, cartel ou apelido do contato fornecedor
}

// Esquema da Entidade: Venda
{
  "id_venda": "string", // Identificador único da transação
  "nome_produto": "string", // Nome do produto transacionado
  "id_comprador": "string", // Identificador criptografado ou apelido do comprador
  "peso_por_unidade_g": "number", // Peso da unidade vendida (em gramas)
  "quantidade_unidades": "number" // Total de pacotes adquiridos nesta operação
}

Nota: Os registros mockados contendo os dados iniciais foram implementados diretamente em variáveis no topo do arquivo App.jsx, conforme exigido.

Tarefa 1.3: Implementação da Interface em React
Descrição dos Componentes
O front-end foi construído em um arquivo único (App.jsx) e dividido em três componentes principais:

ListaProdutos: Componente funcional de exibição.

Responsabilidade: Renderizar uma tabela estruturada apresentando o balanço atual do estoque.

Consumo de dados: Recebe um array de Produto via props e mapeia as propriedades nome, quantidade, pureza_percentual e fornecedor.

FormularioVenda: Componente interativo de submissão.

Responsabilidade: Coletar os dados para o registro de uma nova saída de carga e fornecer feedback visual ao usuário após a execução. Possui validação interna para impedir transações que superem a massa disponível no estoque.

Consumo de dados: Consome o array de Produto via props para alimentar as opções do campo <select>.

App (Componente Principal): Componente de gerenciamento de estado.

Responsabilidade: Gerenciar os estados globais da aplicação utilizando useState. Ele mantém o controle do estado de busca (filtro de produtos pelo nome) e o estado do próprio array de produtos, permitindo que a função processarVenda calcule e deduza a massa vendida do estoque em tempo real.

Justificativa da Biblioteca de CSS
Foi escolhido o Tailwind CSS (importado via CDN no index.html). A escolha se justifica tecnicamente por ser uma biblioteca estritamente de classes utilitárias (utility-first). Isso permitiu a construção rápida de uma interface altamente customizada com temática "Dark Web/Terminal", adequando-se perfeitamente ao domínio da aplicação, sem violar a restrição da atividade de não utilizar bibliotecas com componentes pré-estilizados (como Material UI). O Tailwind centraliza a estilização diretamente no JSX, dispensando a criação de arquivos de folha de estilo externos e complexos, mantendo o foco na lógica do React.
