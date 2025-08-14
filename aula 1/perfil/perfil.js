// Script para trocar a seção ativa ao clicar no menu

const botoes = document.querySelectorAll('.botao-categoria');
const secoes = document.querySelectorAll('main > section');

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    // Remove ativo de todos os botões
    botoes.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    const secaoAlvo = botao.getAttribute('data-secao');

    // Esconder todas as seções e mostrar a selecionada
    secoes.forEach(secao => {
      if (secao.id === secaoAlvo) {
        secao.style.display = 'block';
      } else {
        secao.style.display = 'none';
      }
    });
  });
});
