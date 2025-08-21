// Alternar seções principais
const botoes = document.querySelectorAll(".menu button");
const secoes = document.querySelectorAll(".secao");

botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    const alvo = botao.getAttribute("data-alvo");
    secoes.forEach(secao => secao.classList.remove("ativa"));
    document.getElementById(alvo).classList.add("ativa");
  });
});

// Notícias dinâmicas do INÍCIO
const noticiasEl = document.getElementById("noticias");

const noticias = {
  recentes: [
    { img: "img/evento1.jpg", titulo: "Batismo Comunitário", data: "05/06/2025", desc: "Uma manhã de fé e celebração." },
    { img: "img/evento2.jpg", titulo: "Visita do Bispo", data: "10/06/2025", desc: "Celebração especial com bênção." },
    { img: "img/evento3.jpg", titulo: "Grupo de Oração", data: "11/06/2025", desc: "Momento de espiritualidade e música." }
  ],
  ultimas: [
    { img: "img/evento4.jpg", titulo: "Festa Junina", data: "01/06/2025", desc: "Tradição com comidas típicas e alegria." },
    { img: "img/evento5.jpg", titulo: "Coral Infantil", data: "28/05/2025", desc: "Apresentação emocionante." },
    { img: "img/evento6.jpg", titulo: "Noite da Juventude", data: "25/05/2025", desc: "Louvor e integração entre jovens." }
  ],
  informativo: [
    { img: "img/evento7.jpg", titulo: "Campanha de Alimentos", data: "Junho/2025", desc: "Doe alimentos para famílias carentes." },
    { img: "img/evento8.jpg", titulo: "Novo Horário de Missas", data: "Domingos", desc: "Missas às 8h, 10h e 18h." },
    { img: "img/evento9.jpg", titulo: "Reforma do Salão", data: "Em andamento", desc: "Melhoria para eventos comunitários." }
  ]
};

// Função para renderizar notícias
function renderNoticias(tipo) {
  noticiasEl.innerHTML = noticias[tipo]
    .map(n => `
      <div>
        <img src="${n.img}" alt="${n.titulo}">
        <p><strong>${n.titulo}</strong><br>${n.data}<br>${n.desc}</p>
      </div>
    `).join("");
}

// Botões de notícias
document.getElementById("btnRecentes").addEventListener("click", () => renderNoticias("recentes"));
document.getElementById("btnUltimas").addEventListener("click", () => renderNoticias("ultimas"));
document.getElementById("btnInformativo").addEventListener("click", () => renderNoticias("informativo"));

// Mostrar "recentes" por padrão
renderNoticias("recentes");