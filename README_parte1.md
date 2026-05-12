O problema a ser resolvido é facilitar a comunicação, compra, venda e distribuição de drogas ilícitas em pequenas ou grandes quantidades. O sistema deve registrar todo o estoque disponível, registrando os detalhes das cargas e das vendas feitas. O usuário principal é o organizador Drug Dealer do negócio.
As entidades principais de dados da aplicação são produto e venda.

// Esquema da Entidade Produto
{
  "id": "string", // Identificador único do lote ou produto
  "nome": "string", // Nomenclatura comercial da substância
  "quantidade": "number", // Quantidade total de massa em estoque
  "pureza_percentual": "number", // Nível de pureza química (0 a 100)
  "fornecedor": "string" // Nome, cartel ou apelido do contato fornecedor
}

// Esquema da Entidade Venda
{
  "id_venda": "string", // Identificador único da transação
  "nome_produto": "string", // Nome do produto transacionado
  "id_comprador": "string", // Identificador criptografado ou apelido do comprador
  "peso_por_unidade_g": "number", // Peso da unidade vendida (em gramas)
  "quantidade_unidades": "number" // Total de pacotes adquiridos nesta operação
}