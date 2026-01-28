// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Auto-slide every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// FAQ accordion
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

// Close modal on outside click
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
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Add to cart
function addToCart(productId) {
    const currentCount = parseInt(document.querySelector('.cart-count').textContent);
    document.querySelector('.cart-count').textContent = currentCount + 1;
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
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');

    if (input.length < 2) {
        resultsContainer.classList.remove('active');
        return;
    }

    const filtered = mockProducts.filter(product => 
        product.name.toLowerCase().includes(input) || 
        product.category.toLowerCase().includes(input)
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

// Close search results when clicking outside
document.addEventListener('click', function(event) {
    const searchBar = document.querySelector('.search-bar');
    if (!searchBar.contains(event.target)) {
        document.getElementById('searchResults').classList.remove('active');
    }
});

// Scroll products slider
function scrollProducts(direction) {
    const container = document.getElementById('topProducts');
    const scrollAmount = 300;
    container.scrollLeft += direction * scrollAmount;
}

// Subscribe form
function subscribe(event) {
    event.preventDefault();
    const email = event.target.querySelector('input').value;
    showToast('✓ Вы подписались на рассылку! Промокод WELCOME10 добавлен в личный кабинет');
    event.target.reset();
}

// Initialize sticky header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header-bottom');
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
    const discount = 0; // Will be calculated based on promo code
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

function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    contents.forEach(content => {
        if (content.dataset.tab === tabName) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
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

// Initialize cart on load
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    updateCartCount();
});

console.log('SportNutrition.by prototype loaded successfully!');
