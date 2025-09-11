// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Dados dos produtos
    const products = [
        {
            id: 1,
            name: "Blazer Elegance",
            category: "Roupas",
            price: 299.90,
            description: "Blazer moderno com corte impecável para ocasiões especiais.",
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 2,
            name: "Perfume Essence",
            category: "Perfumes",
            price: 189.90,
            description: "Fragrância exclusiva com notas amadeiradas e florais.",
            image: "https://images.unsplash.com/photo-1592945403407-9de659572da6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 3,
            name: "Bolsa Premium",
            category: "Bolsas",
            price: 399.90,
            description: "Bolsa em couro legítimo com acabamento refinado.",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 4,
            name: "Relógio Classic",
            category: "Acessórios",
            price: 459.90,
            description: "Relógio com design atemporal e movimento preciso.",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 5,
            name: "Violão Acústico",
            category: "Instrumentos",
            price: 899.90,
            description: "Violão com excelente qualidade sonora e construção robusta.",
            image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 6,
            name: "Vestido Evening",
            category: "Roupas",
            price: 359.90,
            description: "Vestido elegante para eventos noturnos com detalhes em renda.",
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        }
    ];

    // Elementos do DOM
    const productCarousel = document.getElementById('productCarousel');
    const cartButton = document.getElementById('cartButton');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const ctaButton = document.querySelector('.cta-button');
    const searchBtn = document.querySelector('.search-btn');
    const navLinks = document.querySelectorAll('nav a');
    const newsletterForm = document.querySelector('.newsletter-form');

    // Carrinho de compras
    let cart = [];

    // Renderizar produtos
    function renderProducts() {
        productCarousel.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
                </div>
            `;
            productCarousel.appendChild(productCard);
        });

        // Adicionar event listeners aos botões
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }

    // Adicionar produto ao carrinho
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCart();
        
        // Feedback visual
        const button = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
        const originalText = button.textContent;
        button.textContent = "Adicionado!";
        button.classList.add('added');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('added');
        }, 1500);
    }

    // Atualizar carrinho
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                count += item.quantity;

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-price">R$ ${item.price.toFixed(2)}</p>
                        <div class="cart-item-actions">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
        }

        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
        cartCount.textContent = count;

        // Adicionar event listeners aos botões do carrinho
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                changeQuantity(id, 1);
            });
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                changeQuantity(id, -1);
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                removeFromCart(id);
            });
        });
    }

    // Alterar quantidade do item no carrinho
    function changeQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== productId);
            }
            updateCart();
        }
    }

    // Remover item do carrinho
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Controles do carousel
    carouselPrev.addEventListener('click', () => {
        productCarousel.scrollBy({ left: -300, behavior: 'smooth' });
    });

    carouselNext.addEventListener('click', () => {
        productCarousel.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Abrir e fechar carrinho
    cartButton.addEventListener('click', () => {
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede scroll na página principal
    });

    closeCart.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaura scroll
    });

    // Fechar carrinho ao clicar fora
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restaura scroll
        }
    });

    // Botão CTA - Explorar Coleção
    ctaButton.addEventListener('click', () => {
        document.querySelector('.products').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });

    // Botão de busca (simulação)
    searchBtn.addEventListener('click', () => {
        const searchTerm = prompt('O que você está procurando?');
        if (searchTerm) {
            alert(`Buscando por: ${searchTerm}`);
            // Em uma implementação real, aqui você filtraria os produtos
        }
    });

    // Navegação suave para links internos
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });

    // Newsletter form
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            alert(`Obrigado por se inscrever com o email: ${email}`);
            emailInput.value = '';
        }
    });

    // Efeito de digitação no título hero
    function typeWriterEffect() {
        const heroTitle = document.querySelector('.hero h2');
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const speed = 50;
        
        function type() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Inicializar a página
    renderProducts();
    updateCart();
    typeWriterEffect();
});
// script.js - Parte corrigida para a navegação
document.addEventListener('DOMContentLoaded', function() {
    // ... (código anterior permanece igual)
    
    // Navegação suave para links internos
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevenir comportamento padrão apenas para links que não são #
            if (link.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }
            }
        });
    });

    // ... (restante do código permanece igual)
});