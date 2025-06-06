function exibirMensagem(texto,tipo) {
 const mensagem = document.getElementById("mensagem");
 mensagem.innerHTML = texto;
 // Adiciona a classe de estilo(sucesso ou erro)
  mensagem.className = `mensagem ${tipo}`;
  mensagem.classList.remove("hidden");

  // Remove a classe de erro após 3 segundos
  setTimeout(() => {
    mensagem.classList.add("hidden");
  }, 3000);
}

let Pizzaria = [];
function mostrarSecao(secao) {
    const secoes = ['cadastro', 'promocao', 'menu', 'pedido', 'pagamento', 'entrega'];
    secoes.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(secao).classList.remove('hidden');
}

// Exemplo de funções para funcionalidades básicas
function criarCadastro() {
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!nome || !cpf || !email) {
        exibirMensagem('Preencha todos os campos!');
        return;
    } else ('Cadastro realizado com sucesso!');
    mostrarSecao('menu');
}

function buscarMenu() {
    // filtrar opções do menu 
    document.getElementById('form-menu').innerHTML = '';
}

function confirmarPedido() {
    alert('Pedido confirmado!');
    mostrarSecao('pagamento');
}

function adicionarOpcaoPedido() {
    // Opções adicionais simplificadas 
    const opcoes = [
        { id: 'borda', nome: 'Borda Recheada' },
        { id: 'observacao', nome: 'Observação' }
    ];

    let html = '<h3>Adicionar Opções</h3><form id="form-adicionais">';
    opcoes.forEach(opcao => {
        html += `<div class="form-group"><label>${opcao.nome}:</label>`;
        html += `<input type="text" name="${opcao.id}" placeholder="Digite aqui">`;
        html += `</div>`;
    });
    html += `<button type="button" onclick="salvarOpcoesPedido()">Salvar Opções</button></form>`;

    document.getElementById('form-menu').innerHTML = html;
}

function salvarOpcoesPedido() {
    const form = document.getElementById('form-adicionais');
    const dados = {};
   
    for (let i = 0; i < form.elements.length; i++) {
        const el = form.elements[i];
        if (el.name) {
            dados[el.name] = el.value;
        }
    }
    let resumo = 'Opções adicionadas ao pedido:\n';
    
    for (const chave in dados) {
        if (dados.hasOwnProperty(chave)) { 
            const valor = dados[chave]; 
            if (valor) {
                const chaveFormatada = chave.charAt(0).toUpperCase() + chave.slice(1);
                resumo += `- ${chaveFormatada}: ${valor}\n`;
            }
        }
    }

    alert(resumo);
    
    document.getElementById('form-menu').innerHTML = '';
}

function confirmarPagamento() {
    const forma = document.getElementById('forma-pagamento').value;
    const mensagemPagamento = document.getElementById('mensagem-pagamento');
    let mensagem = '';
    switch (forma) {
        case 'cartao-credito':
            mensagem = 'Pagamento confirmado: Cartão de Crédito.';
            break;
        case 'cartao-debito':
            mensagem = 'Pagamento confirmado: Cartão de Débito.';
            break;
        case 'dinheiro':
            mensagem = 'Pagamento confirmado em Dinheiro.';
            break;
        case 'pix':
            mensagem = 'Pagamento confirmado via PIX.';
            break;
        default:
            mensagem = 'Forma de pagamento não selecionada.';
    }
    mensagemPagamento.innerHTML = `<span class="sucesso">${mensagem}</span>`;
    document.getElementById('detalhes-pagamento').classList.remove('hidden');
    document.getElementById('detalhes-pagamento-texto').textContent = mensagem;
    // Avança para a próxima seção após 1 segundo
    setTimeout(() => {
        mostrarSecao('entrega');
        mensagemPagamento.textContent = '';
        detalhes.classList.add('hidden');
    }, 1000);
}

function confirmarTipoEntrega() {
    const tipo = document.querySelector('input[name="tipo-entrega"]:checked');
    if (!tipo) {
        alert('Selecione uma opção de entrega!');
        return;
    }
    if (tipo.value === 'retirada') {
        alert('Retirada confirmada!');
    } else {
        solicitarEndereco();
    }
}

function solicitarEndereco() {
    const endereco = prompt("Por favor, insira o endereço de entrega:");
    if (endereco) {
        alert(`Entrega confirmada para o endereço: ${endereco}`);
    } else {
        alert("Endereço não informado. Por favor, tente novamente.");
    }
}

// Mostra a primeira seção ao carregar
window.onload = () => mostrarSecao('cadastro');