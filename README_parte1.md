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
