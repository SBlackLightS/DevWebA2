import React, { useState } from 'react';

// ==========================================
// TAREFA 1.2: DADOS MOCKADOS
// ==========================================
const produtosIniciais = [
  { id: "p1", nome: "Metanfetamina Azul", quantidade: 50000, pureza_percentual: 99.1, fornecedor: "Heisenberg" },
  { id: "p2", nome: "Maconha Prensada", quantidade: 200000, pureza_percentual: 20, fornecedor: "Zé Pequeno" },
  { id: "p3", nome: "Cocaína Pura", quantidade: 30000, pureza_percentual: 85, fornecedor: "Cartel" },
  { id: "p4", nome: "LSD", quantidade: 500, pureza_percentual: 100, fornecedor: "Hoffmann Labs" }
];

const vendasMockadas = [
  { id_venda: "v1", nome_produto: "Metanfetamina Azul", id_comprador: "c_001", peso_por_unidade_g: 1000, quantidade_unidades: 2 },
  { id_venda: "v2", nome_produto: "Maconha Prensada", id_comprador: "c_002", peso_por_unidade_g: 50, quantidade_unidades: 10 },
  { id_venda: "v3", nome_produto: "Cocaína Pura", id_comprador: "c_003", peso_por_unidade_g: 500, quantidade_unidades: 1 },
  { id_venda: "v4", nome_produto: "LSD", id_comprador: "c_004", peso_por_unidade_g: 0.001, quantidade_unidades: 50 }
];

// ==========================================
// COMPONENTE 1: Lista de Produtos
// ==========================================
function ListaProdutos({ produtos }) {
  return (
    <div className="mt-6 border border-emerald-900 rounded overflow-hidden">
      <table className="w-full text-left text-xs md:text-sm text-zinc-300">
        <thead className="bg-emerald-900/30 text-emerald-400 uppercase">
          <tr>
            <th className="p-3">Produto</th>
            <th className="p-3">Estoque (g)</th>
            <th className="p-3">Pureza</th>
            <th className="p-3">Fornecedor</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((prod) => (
            <tr key={prod.id} className="border-b border-zinc-800 transition-colors hover:bg-zinc-900/50">
              <td className="p-3 font-bold text-white">{prod.nome}</td>
              <td className="p-3 font-mono text-emerald-400">{prod.quantidade}g</td>
              <td className="p-3">{prod.pureza_percentual}%</td>
              <td className="p-3 text-zinc-500">{prod.fornecedor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ==========================================
// COMPONENTE 2: Formulário de Venda
// ==========================================
function FormularioVenda({ produtos, onVendaRealizada }) {
  const [comprador, setComprador] = useState('');
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pesoPorUnidade, setPesoPorUnidade] = useState('');
  const [msg, setMsg] = useState('');
  const [erro, setErro] = useState('');

  const enviar = (e) => {
    e.preventDefault();
    setErro('');

    const produtoSelecionado = produtos.find(p => p.id === produtoId);
    const massaTotalVendida = Number(quantidade) * Number(pesoPorUnidade);

    // Validação de estoque para evitar saldo negativo
    if (massaTotalVendida > produtoSelecionado.quantidade) {
      setErro('ERRO: ESTOQUE INSUFICIENTE PARA ESTA OPERAÇÃO.');
      setTimeout(() => setErro(''), 4000);
      return;
    }

    // Chama a função passada pelo App para atualizar o estoque global
    onVendaRealizada(produtoId, massaTotalVendida);

    setMsg(`ORDEM CONCLUÍDA: ${massaTotalVendida}g DESPACHADOS PARA [${comprador}].`);
    
    // Limpa os campos após o sucesso
    setComprador('');
    setProdutoId('');
    setQuantidade('');
    setPesoPorUnidade('');
    
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <div className="mt-8 p-4 bg-zinc-900 border border-zinc-700 rounded shadow-lg shadow-black">
      <h3 className="text-emerald-500 mb-4 font-bold tracking-widest uppercase">Nova Transação</h3>
      
      {msg && <div className="mb-4 p-2 bg-emerald-900 text-emerald-400 border border-emerald-500 text-center text-xs font-bold">{msg}</div>}
      {erro && <div className="mb-4 p-2 bg-red-900 text-red-400 border border-red-500 text-center text-xs font-bold">{erro}</div>}
      
      <form onSubmit={enviar} className="space-y-4">
        <div>
          <label className="block text-[10px] text-zinc-500 uppercase">ID Comprador</label>
          <input 
            type="text"
            className="w-full bg-black border border-zinc-800 p-2 text-emerald-400 focus:border-emerald-500 outline-none transition-colors"
            value={comprador}
            onChange={(e) => setComprador(e.target.value)}
            required
            placeholder="Ex: Heisenberg_99"
          />
        </div>

        <div>
          <label className="block text-[10px] text-zinc-500 uppercase">Carga Selecionada</label>
          <select 
            className="w-full bg-black border border-zinc-800 p-2 text-emerald-400 outline-none transition-colors"
            value={produtoId}
            onChange={(e) => setProdutoId(e.target.value)}
            required
          >
            <option value="" disabled>-- Selecione --</option>
            {produtos.map(p => (
              <option key={p.id} value={p.id}>
                {p.nome} (Disponível: {p.quantidade}g)
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-[10px] text-zinc-500 uppercase">Qtd (Unidades)</label>
            <input 
              type="number"
              className="w-full bg-black border border-zinc-800 p-2 text-emerald-400 focus:border-emerald-500 outline-none transition-colors"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
              min="1"
              placeholder="Ex: 5"
            />
          </div>

          <div className="flex-1">
            <label className="block text-[10px] text-zinc-500 uppercase">Peso/Unid (g)</label>
            <input 
              type="number"
              className="w-full bg-black border border-zinc-800 p-2 text-emerald-400 focus:border-emerald-500 outline-none transition-colors"
              value={pesoPorUnidade}
              onChange={(e) => setPesoPorUnidade(e.target.value)}
              required
              min="0.001"
              step="0.001"
              placeholder="Ex: 50"
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-600 text-black font-black p-2 transition-colors mt-2">
          EXECUTAR VENDA
        </button>
      </form>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL (App)
// ==========================================
export default function App() {
  const [busca, setBusca] = useState('');
  
  // Agora os produtos são um ESTADO da aplicação. Isso permite modificá-los.
  const [produtos, setProdutos] = useState(produtosIniciais);

  // Função que será passada para o formulário para atualizar o estoque
  const processarVenda = (idProduto, massaVendida) => {
    setProdutos(estoqueAtual => 
      estoqueAtual.map(produto => {
        if (produto.id === idProduto) {
          // Retorna um novo objeto de produto com a massa reduzida
          return { ...produto, quantidade: produto.quantidade - massaVendida };
        }
        return produto; // Mantém os outros produtos intactos
      })
    );
  };

  const filtrados = produtos.filter(p => 
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-black mb-1 text-emerald-500 tracking-tighter">NEXUS<span className="text-zinc-500">_SYSTEM</span></h1>
      <p className="text-zinc-500 text-[10px] mb-8 border-b border-zinc-800 pb-2">LOGGED AS: DRUG_DEALER_ADMIN</p>
      
      <input 
        placeholder="FILTRAR ESTOQUE..."
        className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs mb-4 outline-none focus:border-emerald-500 text-emerald-400 transition-colors shadow-black shadow-inner"
        onChange={(e) => setBusca(e.target.value)}
      />

      {/* Tabela consumindo o estado centralizado e filtrado */}
      <ListaProdutos produtos={filtrados} />
      
      {/* Formulário recebe a lista para o Select e a função para debitar */}
      <FormularioVenda produtos={produtos} onVendaRealizada={processarVenda} />
    </div>
  );
}