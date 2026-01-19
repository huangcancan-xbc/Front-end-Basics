class CartPage {
    constructor() {
        this.cartManager = window.cartManager || new CartManager();
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderCart();
        this.updateCartDisplay();
    }

    bindEvents() {
        // 清空购物车
        const clearCartBtn = document.getElementById('clearCartBtn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                this.clearCart();
            });
        }

        // 结算按钮
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.checkout();
            });
        }
    }

    renderCart() {
        const cart = this.cartManager.getCart();
        const emptyCart = document.getElementById('emptyCart');
        const cartItems = document.getElementById('cartItems');
        const cartFooter = document.getElementById('cartFooter');
        const cartItemsList = document.getElementById('cartItemsList');

        if (cart.length === 0) {
            // 显示空购物车
            if (emptyCart) emptyCart.style.display = 'block';
            if (cartItems) cartItems.style.display = 'none';
            if (cartFooter) cartFooter.style.display = 'none';
        } else {
            // 显示购物车商品
            if (emptyCart) emptyCart.style.display = 'none';
            if (cartItems) cartItems.style.display = 'block';
            if (cartFooter) cartFooter.style.display = 'flex';

            // 渲染商品列表
            if (cartItemsList) {
                cartItemsList.innerHTML = cart.map(item => this.renderCartItem(item)).join('');
                this.bindItemEvents();
            }
        }

        this.updateSummary();
    }

    renderCartItem(item) {
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-info">
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                    </div>
                    <div class="item-details">
                        <h4>${item.title}</h4>
                        <div class="item-brand">${item.brand}</div>
                    </div>
                </div>
                <div class="item-price">
                    ¥${item.price.toLocaleString()}
                </div>
                <div class="item-quantity">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease-btn" data-id="${item.id}" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="item-total">
                    ¥${(item.price * item.quantity).toLocaleString()}
                </div>
                <div class="item-actions">
                    <button class="remove-btn" data-id="${item.id}">删除</button>
                </div>
            </div>
        `;
    }

    bindItemEvents() {
        // 增加数量
        document.querySelectorAll('.increase-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                const item = this.cartManager.getCart().find(item => item.id === productId);
                if (item) {
                    this.cartManager.updateQuantity(productId, item.quantity + 1);
                    this.renderCart();
                    this.updateCartDisplay();
                }
            });
        });

        // 减少数量
        document.querySelectorAll('.decrease-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                const item = this.cartManager.getCart().find(item => item.id === productId);
                if (item && item.quantity > 1) {
                    this.cartManager.updateQuantity(productId, item.quantity - 1);
                    this.renderCart();
                    this.updateCartDisplay();
                }
            });
        });

        // 直接输入数量
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = e.target.dataset.id;
                const newQuantity = parseInt(e.target.value) || 1;
                this.cartManager.updateQuantity(productId, Math.max(1, newQuantity));
                this.renderCart();
                this.updateCartDisplay();
            });
        });

        // 删除商品
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                if (confirm('确定要删除这个商品吗？')) {
                    this.cartManager.removeFromCart(productId);
                    this.renderCart();
                    this.updateCartDisplay();
                    this.cartManager.showMessage('商品已删除');
                }
            });
        });
    }

    updateSummary() {
        const totalQuantityElement = document.getElementById('totalQuantity');
        const totalPriceElement = document.getElementById('totalPrice');

        if (totalQuantityElement) {
            totalQuantityElement.textContent = this.cartManager.getTotalQuantity();
        }

        if (totalPriceElement) {
            totalPriceElement.textContent = `¥${this.cartManager.getTotalPrice().toLocaleString()}`;
        }
    }

    updateCartDisplay() {
        const cartCount = this.cartManager.getTotalQuantity();
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
    }

    clearCart() {
        if (confirm('确定要清空购物车吗？')) {
            this.cartManager.clearCart();
            this.renderCart();
            this.updateCartDisplay();
            this.cartManager.showMessage('购物车已清空');
        }
    }

    checkout() {
        const cart = this.cartManager.getCart();
        if (cart.length === 0) {
            this.cartManager.showMessage('购物车是空的，请先添加商品', 'error');
            return;
        }

        const totalPrice = this.cartManager.getTotalPrice();
        const totalQuantity = this.cartManager.getTotalQuantity();
        
        // 模拟结算过程
        if (confirm(`确定要结算吗？\n\n商品总数：${totalQuantity} 件\n总金额：¥${totalPrice.toLocaleString()}`)) {
            // 这里可以跳转到真实的结算页面
            this.cartManager.showMessage('结算成功！感谢您的购买！', 'success');
            
            // 清空购物车
            setTimeout(() => {
                this.cartManager.clearCart();
                this.renderCart();
                this.updateCartDisplay();
            }, 2000);
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 确保CartManager已经加载
    if (typeof CartManager !== 'undefined') {
        window.cartPage = new CartPage();
    } else {
        console.error('CartManager not found. Please make sure main.js is loaded first.');
    }
});