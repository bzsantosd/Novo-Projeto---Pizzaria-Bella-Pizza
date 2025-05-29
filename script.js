function exibirMensagem(texto,tipo) {
 const mensagem = document.getElementById("mensagem");
 mensagem.textContent = texto;
 // Adiciona a classe de estilo(sucesso ou erro)
  mensagem.className = `mensagem ${tipo}`;
  mensagem.classList.remove= ("hidden");

  // Remove a classe de erro após 3 segundos
  setTimeout(() => {
    mensagem.classList.add("hidden");
  }, 3000);
}

function  validarLogin() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;
  
  const usuarioCorreto = "admin";
  const senhaCorreta= "1234";

  if (usuario === usuarioCorreto && senha=== senhaCorreta) {
    exibirMensagem("Login realizado com sucesso!", "sucesso");
   setTimeout(() => {
    // Redirecionar para a página inicial após 3 segundos
    window.location.href = "index.html";
  }, 1000);
} else {
    exibirMensagem("Usuário ou senha incorretos!", "erro");
  }
}

let Pizzaria = [];
// let pizzaParaAlterar = null;

function mostrarSecao(secao) {
    // esconde todas as secoes
    document.getElementById("cadastro").classList.add("hidden");
    document.getElementById("consulta").classList.add("hidden");
    document.getElementById("venda").classList.add("hidden");
    document.getElementById("alterar").classList.add("hidden");
    document.getElementById("relatorio-vendas").classList.add("hidden");

    //mostrar a seçao selecionada 
    document.getElementById(secao).classList.remove("hidden");
}
function criarCadastro() {
    const nome = document.getElementById("nome").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const descricao = document.getElementById("descricao").value;

    if (nome && preco && descricao) {
      Pizzaria.push({ nome, preco, descricao });
      document.getElementById("nome").value = "";
      document.getElementById("preco").value = "";
      document.getElementById("descricao").value = "";
    //   atualizarLista();
      document.getElementById("mensagem").innerHTML = ("Pizza adicionada com sucesso!");

}
}

function atualizarLista(lista = Pizzaria) {
  const tabela = document.getElementById("lista-pizzas");
  tabela.innerHTML = "";

  lista.forEach((Pizza) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${Pizza.nome}</td>
      <td>${Pizza.preco}</td>
      <td>${Pizza.descricao}</td>
      `;
      tabela.appendChild(linha);
  });
}
   function buscarPizza(){
        const busca = document.getElementById("busca").value.toLowerCase();
        const resultado = Pizzaria.filter((Pizza) => Pizza.nome.toLowerCase().includes(busca));
    atualizarLista(resultado);
    }

 function buscarPizzaParaAlterar() {
   const busca =document.getElementById("busca-alterar").value.toLowerCase();
   PizzaParaAlterar= Pizzaria.find((Pizza) => 
   Pizza.nome.toLowerCase().includes(busca)
 );

 if (PizzaParaAlterar) {
   document.getElementById("form-alterar").classList.remove("hidden");
   document.getElementById("novo-nome").value=PizzaParaAlterar.nome;
     document.getElementById("novo-descricao").value=PizzaParaAlterar.descricao;
       document.getElementById("novo-preco").value=PizzaParaAlterar.preco;
 }
 else {
  alert("Pizza não encontrada.");
 }
}

// --- Registro de Vendas ---
let vendas = [];

function registrarVenda() {
  const nome = document.getElementById("venda-nome").value;
  const quantidade = parseInt(
    document.getElementById("venda-quantidade").value
  );
  const comprador = document.getElementById("venda-comprador").value;

  if (nome && quantidade && comprador) {
    const pizza = Pizzaria.find(
      (pizza) => pizza.nome.toLowerCase() === nome.toLowerCase()
    );

    if (pizza) {
      const total = pizza.preco * quantidade;
      vendas.push({ nome: pizza.nome, quantidade, comprador, total });

      const listaVendas = document.getElementById("lista-vendas");
      const item = document.createElement("li");
      item.textContent = `Pizza: ${
        pizza.nome
      }, Quantidade: ${quantidade}, Comprador: ${comprador}, Total: R$ ${total.toFixed(
        2
      )}`;
      listaVendas.appendChild(item);

      exibirMensagem("Venda registrada com sucesso!", "sucesso");
      document.getElementById("venda-nome").value = "";
      document.getElementById("venda-quantidade").value = "";
      document.getElementById("venda-comprador").value = "";
    } else {
      exibirMensagem("Pizza não encontrada no cardápio.", "erro");
    }
  } else {
    exibirMensagem("Por favor, preencha todos os campos.", "erro");
  }
}

// --- Relatório de Vendas ---
function gerarRelatorioVendas() {
  const tabelaRelatorio = document.getElementById("tabela-relatorio-vendas");
  tabelaRelatorio.innerHTML = "";

    document.getElementById("cadastro").classList.add("hidden");
    document.getElementById("consulta").classList.add("hidden");
    document.getElementById("venda").classList.add("hidden");
    document.getElementById("alterar").classList.add("hidden");

  if (vendas.length === 0) {
    exibirMensagem("Nenhuma venda registrada.", "erro");
    return;
  }

  let totalVendas = 0;

  vendas.forEach((venda) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
        <td>${venda.nome}</td>
        <td>${venda.quantidade}</td>
        <td>${venda.comprador}</td>
        <td>R$ ${venda.total.toFixed(2)}</td>
      `;
    tabelaRelatorio.appendChild(linha);

    totalVendas += venda.total;
  });

  const linhaTotal = document.createElement("tr");
  linhaTotal.innerHTML = `
      <td><strong>Total</strong></td>
      <td></td>
      <td></td>
      <td><strong>R$ ${totalVendas.toFixed(2)}</strong></td>
    `;
  tabelaRelatorio.appendChild(linhaTotal);

    document.getElementById("relatorio-vendas").classList.remove("hidden");
  }