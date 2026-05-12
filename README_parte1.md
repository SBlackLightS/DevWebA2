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
```
Nota: Os registros mockados contendo os dados iniciais foram implementados diretamente em variáveis no topo do arquivo App.jsx, conforme exigido.

# Tarefa 1.3: Implementação da Interface em React

## Descrição dos Componentes

A interface foi estruturada de forma modular dentro do arquivo único `App.jsx`, dividindo as responsabilidades entre os seguintes componentes:

* **ListaProdutos**: 
    * **Responsabilidade**: Atua como o componente de exibição (output) do sistema. Ele renderiza uma tabela formatada que apresenta o balanço atual do inventário.
    * **Consumo de dados**: Consome o estado centralizado de produtos, mapeando as propriedades de `nome`, `quantidade`, `pureza_percentual` e `fornecedor`.
* **FormularioVenda**: 
    * **Responsabilidade**: Gerencia a entrada de dados (input) para novas transações. Inclui lógica de validação para impedir que o estoque fique negativo e emite um feedback visual (mensagem de sucesso ou erro) após a submissão.
    * **Consumo de dados**: Utiliza a lista de produtos para popular o campo de seleção (`<select>`) e envia os dados capturados para a função de processamento no componente pai.
* **App (Root)**: 
    * **Responsabilidade**: Centraliza o estado da aplicação (`useState`). Gerencia a lógica de filtragem da busca e a função de "Lifting State Up" que permite debitar o estoque conforme as vendas são confirmadas no formulário.

## Justificativa da Biblioteca de CSS

A biblioteca utilizada para a estilização foi o **Tailwind CSS**. A escolha justifica-se pelos seguintes critérios técnicos:

1.  **Utility-First**: O Tailwind permite aplicar estilos diretamente via classes utilitárias no JSX, o que agiliza o desenvolvimento de interfaces customizadas sem a necessidade de alternar constantemente entre arquivos CSS externos.
2.  **Conformidade com os Requisitos**: Por ser uma biblioteca de utilitários e não de componentes pré-moldados, ela cumpre a restrição de não utilizar bibliotecas como Material UI ou Chakra UI, permitindo a criação de um layout original do zero.
3.  **Consistência Visual**: Facilitou a implementação do tema "Terminal/Dark Mode" através de sua escala de cores (como `zinc-950` e `emerald-400`), garantindo uma estética coerente com o domínio de aplicação escolhido.
