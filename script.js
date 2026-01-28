// Slider functionality
let currentSlide = 0;
let slides = [];
let dots = [];
let sliderTimer = null;

function initSlider() {
    slides = Array.from(document.querySelectorAll('.slide'));
    dots = Array.from(document.querySelectorAll('.dot'));

    if (slides.length === 0) return;

    slides.forEach((s, i) => s.classList.toggle('active', i === 0));
    dots.forEach((d, i) => d.classList.toggle('active', i === 0));

    if (slides.length > 1 && !sliderTimer) {
        sliderTimer = setInterval(() => {
            changeSlide(1);
        }, 5000);
    }
}

function showSlide(index) {
    if (!slides || slides.length === 0) return;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    if (!slides || slides.length === 0) return;
    currentSlide += direction;
    showSlide(currentSlide);
}

function goToSlide(index) {
    if (!slides || slides.length === 0) return;
    currentSlide = index;
    showSlide(currentSlide);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    if (!navMenu) return;
    navMenu.classList.toggle('active');
}

// FAQ accordion
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// Login tab switching
function switchTab(tabName) {
    const smsForm = document.getElementById('smsLogin');
    const emailForm = document.getElementById('emailLogin');
    const tabs = document.querySelectorAll('.tab-btn');

    if (!smsForm || !emailForm) return;

    tabs.forEach(tab => tab.classList.remove('active'));

    if (tabName === 'sms') {
        smsForm.style.display = 'block';
        emailForm.style.display = 'none';
        tabs[0].classList.add('active');
    } else {
        smsForm.style.display = 'none';
        emailForm.style.display = 'block';
        tabs[1].classList.add('active');
    }
}

// Toast notification
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Add to cart
function addToCart(productId) {
    const countElement = document.querySelector('.cart-count');
    if (!countElement) return;
    const currentCount = parseInt(countElement.textContent);
    countElement.textContent = currentCount + 1;
    showToast('✓ Товар добавлен в корзину');
}

// Search functionality
const mockProducts = [
    { id: 1, name: 'Optimum Nutrition Whey Gold Standard', category: 'Протеин' },
    { id: 2, name: 'Витамин D3 5000 МЕ + K2', category: 'Витамины' },
    { id: 3, name: 'BCAA 2:1:1 порошок', category: 'Аминокислоты' },
    { id: 4, name: 'L-Карнитин 3000 жидкий', category: 'Жиросжигатели' },
    { id: 5, name: 'Омега-3 1000 мг', category: 'Омега и Жиры' },
    { id: 6, name: 'Магний + B6 для сна', category: 'Минералы' },
    { id: 7, name: 'Креатин моногидрат', category: 'Креатин' },
    { id: 8, name: 'Мультивитамины мужские', category: 'Витамины' }
];

function searchProducts() {
    const input = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');

    if (!input || !resultsContainer) return;

    const inputValue = input.value.toLowerCase();

    if (inputValue.length < 2) {
        resultsContainer.classList.remove('active');
        return;
    }

    const filtered = mockProducts.filter(product => 
        product.name.toLowerCase().includes(inputValue) || 
        product.category.toLowerCase().includes(inputValue)
    );

    if (filtered.length > 0) {
        resultsContainer.innerHTML = filtered.map(product => `
            <div class="search-result-item" onclick="window.location.href='product.html'">
                <div class="placeholder-img" style="font-size: 2rem;">📦</div>
                <div>
                    <strong>${product.name}</strong><br>
                    <small style="color: #6c757d;">${product.category}</small>
                </div>
            </div>
        `).join('');
        resultsContainer.classList.add('active');
    } else {
        resultsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #6c757d;">Ничего не найдено</div>';
        resultsContainer.classList.add('active');
    }
}

document.addEventListener('click', function(event) {
    const searchBar = document.querySelector('.search-bar');
    const searchResults = document.getElementById('searchResults');
    if (searchBar && searchResults && !searchBar.contains(event.target)) {
        searchResults.classList.remove('active');
    }
});

// Scroll products slider
function scrollProducts(direction) {
    const container = document.getElementById('topProducts');
    if (!container) return;
    const scrollAmount = 300;
    container.scrollLeft += direction * scrollAmount;
}

// Subscribe form
function subscribe(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input');
    if (!emailInput) return;
    const email = emailInput.value;
    showToast('✓ Вы подписались на рассылку! Промокод WELCOME10 добавлен в личный кабинет');
    event.target.reset();
}

// Initialize sticky header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header-bottom');
    if (!header) return;
    if (window.scrollY > 100) {
        header.classList.add('sticky-header');
    }
});

// Cart functionality
let cartItems = [
    { id: 1, name: 'Optimum Nutrition Whey Gold Standard', price: 96, quantity: 1, image: '🥤' },
    { id: 2, name: 'Витамин D3 5000 МЕ + K2', price: 24, quantity: 1, image: '💊' }
];

function renderCart() {
    const container = document.getElementById('cartItems');
    if (!container) return;

    if (cartItems.length === 0) {
        container.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        updateCartSummary();
        return;
    }

    container.innerHTML = cartItems.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p class="cart-item-price">${item.price} руб.</p>
            </div>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <input type="number" value="${item.quantity}" min="1" onchange="setQuantity(${item.id}, this.value)">
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="cart-item-total">${item.price * item.quantity} руб.</div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">🗑️</button>
        </div>
    `).join('');

    updateCartSummary();
}

function updateQuantity(itemId, change) {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        renderCart();
    }
}

function setQuantity(itemId, value) {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
        item.quantity = Math.max(1, parseInt(value) || 1);
        renderCart();
    }
}

function removeFromCart(itemId) {
    cartItems = cartItems.filter(i => i.id !== itemId);
    renderCart();
    updateCartCount();
}

function updateCartCount() {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.querySelector('.cart-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

function updateCartSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = 0;
    const total = subtotal - discount;

    const summaryElement = document.getElementById('cartSummary');
    if (summaryElement) {
        summaryElement.innerHTML = `
            <div class="summary-row">
                <span>Товаров на сумму:</span>
                <span>${subtotal} руб.</span>
            </div>
            <div class="summary-row">
                <span>Скидка:</span>
                <span class="discount">-${discount} руб.</span>
            </div>
            <div class="summary-total">
                <span>Итого:</span>
                <span>${total} руб.</span>
            </div>
        `;
    }
}

function applyPromocode() {
    const input = document.getElementById('promocodeInput');
    if (!input) return;
    const code = input.value.trim().toUpperCase();

    if (code === 'WELCOME10') {
        showToast('✓ Промокод применен! Скидка 10%');
    } else {
        showToast('❌ Неверный промокод', 2000);
    }
}

function clearCart() {
    if (confirm('Очистить корзину?')) {
        cartItems = [];
        renderCart();
        updateCartCount();
    }
}

// Product page functions
function changeProductImage(index) {
    const images = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-product-image');

    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

function changeVariant(variantName) {
    const buttons = document.querySelectorAll('.variant-btn');
    buttons.forEach(btn => {
        if (btn.textContent.includes(variantName)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function openLightbox() {
    showToast('Открытие галереи изображений');
}

// Catalog filters
function applyFilters() {
    showToast('Фильтры применены');
}

function resetFilters() {
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
    showToast('Фильтры сброшены');
}

function sortProducts(sortBy) {
    showToast('Сортировка: ' + sortBy);
}

// === PROMO UI AUTO-INJECTION ===
function injectPromoBar() {
    const header = document.querySelector('.header');
    if (!header || document.querySelector('.promo-bar')) return;

    const promoBar = document.createElement('div');
    promoBar.className = 'promo-bar';
    promoBar.innerHTML = `
        <div class="container promo-bar__content">
            <div class="promo-bar__left">
                <a href="catalog.html" class="promo-chip promo-chip--promo">Промокод на первый заказ</a>
                <a href="delivery.html" class="promo-chip">Доставка и самовывоз</a>
                <a href="catalog.html" class="promo-chip promo-chip--hot">Горячие скидки</a>
            </div>
            <div class="promo-bar__right">
                <a href="delivery.html" class="promo-link">Условия →</a>
            </div>
        </div>
    `;
    header.insertBefore(promoBar, header.firstChild);
}

function injectHeroChips() {
    const slideContents = document.querySelectorAll('.slide-content');
    slideContents.forEach(content => {
        if (content.querySelector('.hero-chips')) return;
        const h1 = content.querySelector('h1');
        if (!h1) return;

        const heroChips = document.createElement('div');
        heroChips.className = 'hero-chips';
        heroChips.innerHTML = `
            <span class="promo-chip promo-chip--ghost">Акция</span>
            <span class="promo-chip promo-chip--ghost promo-chip--hot">До конца недели</span>
        `;
        content.insertBefore(heroChips, h1);
    });
}

function injectTrustTiles() {
    const advantages = document.querySelector('.advantages');
    if (!advantages || document.querySelector('.trust-tiles')) return;

    const trustSection = document.createElement('section');
    trustSection.className = 'trust-tiles';
    trustSection.innerHTML = `
        <div class="container">
            <h2 class="section-title">Почему нам доверяют</h2>
            <div class="trust-grid">
                <div class="trust-tile">
                    <div class="trust-icon">✅</div>
                    <div class="trust-title">Оригинальная продукция</div>
                    <div class="trust-text">Проверяем поставки и документы</div>
                </div>
                <div class="trust-tile">
                    <div class="trust-icon">🚚</div>
                    <div class="trust-title">Быстрая доставка</div>
                    <div class="trust-text">По Минску и по Беларуси</div>
                </div>
                <div class="trust-tile">
                    <div class="trust-icon">💳</div>
                    <div class="trust-title">Удобная оплата</div>
                    <div class="trust-text">Картой онлайн или при получении</div>
                </div>
                <div class="trust-tile">
                    <div class="trust-icon">🎧</div>
                    <div class="trust-title">Поддержка</div>
                    <div class="trust-text">Поможем подобрать под цель</div>
                </div>
            </div>
        </div>
    `;
    advantages.parentNode.insertBefore(trustSection, advantages.nextSibling);
}

// Initialize everything on load
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    injectPromoBar();
    injectHeroChips();
    injectTrustTiles();
    renderCart();
    updateCartCount();
});

console.log('SportNutrition.by prototype loaded with Fitpoint promo UI!');
