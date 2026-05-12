# Tarefa 2.1: Modelagem da API e Alinhamento com o Front-End

## Lista de Endpoints REST

1. **`POST /login`**
   - **Descrição**: Recebe credenciais e retorna um token JWT para acesso.
   - **Acesso**: Público.
2. **`GET /produtos`**
   - **Descrição**: Retorna a lista de produtos (estoque) disponíveis no sistema.
   - **Acesso**: Protegido.
3. **`POST /produtos`**
   - **Descrição**: Adiciona uma nova carga/produto ao estoque do sistema.
   - **Acesso**: Protegido.
4. **`GET /vendas`**
   - **Descrição**: Retorna o histórico de todas as transações realizadas.
   - **Acesso**: Protegido.
5. **`POST /vendas`**
   - **Descrição**: Registra uma nova operação de despache/venda.
   - **Acesso**: Protegido.

## Justificativa de Proteção (Autenticação)

Todos os endpoints (`GET /produtos`), (`POST /produtos`), (`GET /vendas`) e (`POST /vendas`) foram definidos como protegidos. Em um sistema de distribuição gerencial, o balanço de novas cargas e o livro-caixa de transações são dados corporativos (e sensíveis). Permitir acesso público a essas rotas permitiria que pessoas não autorizadas manipulassem o balanço de massa do estoque ou expusessem dados operacionais críticos (como IDs de compradores). Apenas usuários validados (como administradores) devem deter esse privilégio.

## Alinhamento dos Modelos de Dados (API vs Front-End)

Os Schemas Pydantic foram desenhados para espelhar perfeitamente os objetos JSON mockados construídos no front-end na Parte 1.

* **Coincidências:** O schema `Produto` possui a exata mesma estrutura que os mockados do React: `id`, `nome`, `quantidade`, `pureza_percentual` e `fornecedor`.
* **Campos Adicionados/Omitidos:** Para a entidade de Vendas, o front-end enviava um objeto reduzido no formulário (apenas ID do comprador, ID do produto, quantidade e peso). O backend implementou o modelo `VendaIn` com um campo adicional `id_venda` para garantir a unicidade do registro no banco em memória, consolidando os dados recebidos com os gerados no servidor.

---

# Tarefa 2.2: Exemplos de Uso (Documentação)

Abaixo estão exemplos práticos de requisição e resposta de acordo com a implementação feita no `api.py`.

### Endpoint: `POST /login` (Função: `login`)
* **Requisição (Form Data):** `username=admin` & `password=admin` 
* **Resposta (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUz...",
  "token_type": "bearer"
}
```

### Endpoint: `GET /produtos` (Função: `listar_produtos`)
* **Header:** `Authorization: Bearer <seu_token_jwt>`
* **Requisição:** Nenhuma.
* **Resposta (200 OK):**
```json
{
    "id": "p1",
    "nome": "Metanfetamina Azul Cristal",
    "quantidade": 50000.0,
    "pureza_percentual": 99.1,
    "fornecedor": "Heisenberg"
}
```

### Endpoint: `POST /produtos` (Função: `criar_produto`)
* **Header:** `Authorization: Bearer <seu_token_jwt>`
* **Requisição:** Nenhuma.
* **Resposta (200 OK):**
```json
{
  "id": "p5",
  "nome": "Jay-B",
  "quantidade": 15000.0,
  "pureza_percentual": 90.5,
  "fornecedor": "Amsterdã Labs"
}
```
* **Resposta (200 OK):**


### Endpoint: `GET /vendas` (Função: `registrar_venda`)
* **Header:** `Authorization: Bearer <seu_token_jwt>`
* **Requisição:** Nenhuma.
* **Resposta (200 OK):**
```json
{
  "id_venda": "v10",
  "nome_produto": "LSD",
  "id_comprador": "Twagger",
  "peso_por_unidade_g": 0.001,
  "quantidade_unidades": 500
}
```

### Endpoint: `POST /vendas` (Função: `registrar_venda`)
* **Header:** `Authorization: Bearer <seu_token_jwt>`
* **Body da Requisição:**
```json
{
  "id_venda": "v10",
  "nome_produto": "LSD",
  "id_comprador": "cliente_alpha",
  "peso_por_unidade_g": 0.001,
  "quantidade_unidades": 500
}
```
* **Resposta (200 OK):**
```json
{
  "mensagem": "Operação registrada com sucesso.",
  "venda": {
    "id_venda": "v10",
    "nome_produto": "LSD",
    "id_comprador": "cliente_alpha",
    "peso_por_unidade_g": 0.001,
    "quantidade_unidades": 500
  }
}
```
