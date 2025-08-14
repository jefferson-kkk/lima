function mostrarSecao(secaoId) {
  // Esconde todas as seções
  document.querySelectorAll('.secao-noticias').forEach(secao => {
    secao.classList.remove('ativa');
  });
  
  // Mostra a seção selecionada
  document.getElementById(secaoId).classList.add('ativa');
  
  // Atualiza botões ativos
  document.querySelectorAll('.botao-categoria').forEach(botao => {
    botao.classList.remove('ativo');
  });
  
  // Ativa o botão correspondente
  const botoes = document.querySelectorAll('.botao-categoria');
  for (let botao of botoes) {
    if (botao.textContent.toLowerCase() === secaoId) {
      botao.classList.add('ativo');
    }
  }
}

// Inicializa a página mostrando a seção Recentes
document.addEventListener('DOMContentLoaded', function() {
  mostrarSecao('recentes');
});