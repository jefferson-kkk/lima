// script.js
// Variável global para armazenar os itens do carrinho
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para mostrar seções
function mostrarSecao(secao) {
    // Oculta todas as seções
    document.querySelectorAll('.secao').forEach(function(el) {
        el.classList.remove('ativa');
    });
    
    // Mostra a seção solicitada
    document.getElementById(secao).classList.add('ativa');
    
    // Se for a seção do carrinho, atualiza a exibição
    if (secao === 'carrinho') {
        atualizarCarrinho();
    }
    
    // Rolagem suave para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(nome, preco, imagem) {
    // Verifica se o produto já está no carrinho
    const itemExistente = carrinho.find(item => item.nome === nome);
    
    if (itemExistente) {
        // Se já existe, aumenta a quantidade
        itemExistente.quantidade++;
    } else {
        // Se não existe, adiciona novo item
        carrinho.push({
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        });
    }
    
    // Salva no localStorage
    salvarCarrinho();
    
    // Atualiza o contador do carrinho
    atualizarContadorCarrinho();
    
    // Mostra mensagem de sucesso
    mostrarNotificacao(`"${nome}" foi adicionado ao carrinho!`);
}

// Função para remover item do carrinho
function removerDoCarrinho(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    salvarCarrinho();
    atualizarCarrinho();
    atualizarContadorCarrinho();
}

// Função para alterar a quantidade de um item
function alterarQuantidade(nome, alteracao) {
    const item = carrinho.find(item => item.nome === nome);
    
    if (item) {
        item.quantidade += alteracao;
        
        // Se a quantidade for zero ou menos, remove o item
        if (item.quantidade <= 0) {
            removerDoCarrinho(nome);
        } else {
            salvarCarrinho();
            atualizarCarrinho();
            atualizarContadorCarrinho();
        }
    }
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const carrinhoItens = document.getElementById('carrinho-itens');
    const carrinhoVazio = document.getElementById('carrinho-vazio');
    const carrinhoTotal = document.getElementById('carrinho-total');
    const totalValor = document.getElementById('total-valor');
    
    // Limpa o conteúdo anterior
    carrinhoItens.innerHTML = '';
    
    if (carrinho.length === 0) {
        // Se o carrinho está vazio
        carrinhoVazio.style.display = 'block';
        carrinhoTotal.style.display = 'none';
    } else {
        // Se há itens no carrinho
        carrinhoVazio.style.display = 'none';
        carrinhoTotal.style.display = 'block';
        
        let total = 0;
        
        // Adiciona cada item ao carrinho
        carrinho.forEach(item => {
            const itemTotal = item.preco * item.quantidade;
            total += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'item-carrinho';
            itemElement.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <div class="item-info">
                    <h4>${item.nome}</h4>
                    <p>R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="controles-item">
                    <button onclick="alterarQuantidade('${item.nome}', -1)">-</button>
                    <span>${item.quantidade}</span>
                    <button onclick="alterarQuantidade('${item.nome}', 1)">+</button>
                    <button class="remover-item" onclick="removerDoCarrinho('${item.nome}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            carrinhoItens.appendChild(itemElement);
        });
        
        // Atualiza o total
        totalValor.textContent = total.toFixed(2).replace('.', ',');
    }
}

// Função para atualizar o contador do carrinho
function atualizarContadorCarrinho() {
    const contador = document.getElementById('contador-carrinho');
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    contador.textContent = totalItens;
    
    // Mostra ou esconde o contador
    if (totalItens > 0) {
        contador.style.display = 'flex';
    } else {
        contador.style.display = 'none';
    }
}

// Função para salvar o carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Função para finalizar a compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    
    if (confirm(`Confirmar compra no valor total de R$ ${total.toFixed(2).replace('.', ',')}?`)) {
        // Limpa o carrinho
        carrinho = [];
        salvarCarrinho();
        atualizarCarrinho();
        atualizarContadorCarrinho();
        
        // Mensagem de sucesso
        mostrarNotificacao('Compra realizada com sucesso! Obrigado pela preferência.', 'success');
        
        // Volta para a página inicial após 2 segundos
        setTimeout(() => {
            mostrarSecao('inicio');
        }, 2000);
    }
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Remove notificações anteriores
    const notificacaoAnterior = document.querySelector('.notificacao');
    if (notificacaoAnterior) {
        notificacaoAnterior.remove();
    }
    
    // Cria a notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao ${tipo}`;
    notificacao.textContent = mensagem;
    
    // Estilos da notificação
    notificacao.style.position = 'fixed';
    notificacao.style.top = '20px';
    notificacao.style.right = '20px';
    notificacao.style.padding = '15px 20px';
    notificacao.style.borderRadius = '5px';
    notificacao.style.color = 'white';
    notificacao.style.zIndex = '1000';
    notificacao.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    notificacao.style.animation = 'slideIn 0.3s ease';
    
    if (tipo === 'success') {
        notificacao.style.background = 'var(--success)';
    } else {
        notificacao.style.background = 'var(--primary)';
    }
    
    // Adiciona ao corpo do documento
    document.body.appendChild(notificacao);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notificacao.parentNode) {
                notificacao.parentNode.removeChild(notificacao);
            }
        }, 300);
    }, 3000);
}

// Adiciona os estilos de animação para as notificações
function adicionarEstilosNotificacao() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Função para inicializar a página
function inicializarPagina() {
    // Mostra a seção inicial
    mostrarSecao('inicio');
    
    // Atualiza o contador do carrinho
    atualizarContadorCarrinho();
    
    // Adiciona estilos para notificações
    adicionarEstilosNotificacao();
    
    // Configura o formulário de contato
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simula o envio do formulário
            const nome = document.getElementById('nome').value;
            mostrarNotificacao(`Obrigado, ${nome}! Sua mensagem foi enviada.`, 'success');
            formContato.reset();
        });
    }
    
    // Configura a pesquisa
    const formPesquisa = document.querySelector('.search-form');
    if (formPesquisa) {
        formPesquisa.addEventListener('submit', function(e) {
            e.preventDefault();
            const termo = this.querySelector('input[name="q"]').value;
            if (termo.trim() !== '') {
                mostrarNotificacao(`Buscando por: ${termo}`);
                // Aqui você implementaria a lógica de busca real
            }
        });
    }
}

// Inicializa a página quando carregada
document.addEventListener('DOMContentLoaded', inicializarPagina);

// Adiciona suporte para teclado nas funções de acessibilidade
document.addEventListener('keydown', function(e) {
    // Tecla ESC fecha notificações
    if (e.key === 'Escape') {
        const notificacao = document.querySelector('.notificacao');
        if (notificacao) {
            notificacao.remove();
        }
    }
});