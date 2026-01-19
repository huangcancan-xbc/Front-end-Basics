// 首页JavaScript功能

// 轮播图管理
class BannerSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.autoPlayInterval = null;
        
        this.init();
    }

    init() {
        // 绑定事件
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // 绑定指示器点击事件
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // 开始自动播放
        this.startAutoPlay();
        
        // 鼠标悬停时暂停自动播放
        const slider = document.querySelector('.banner-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => this.stopAutoPlay());
            slider.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }

    goToSlide(index) {
        // 移除当前活动状态
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // 设置新的活动状态
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.stopAutoPlay(); // 先清除之前的定时器
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 3000); // 每3秒切换一次
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// 商品展示管理
class ProductDisplay {
    constructor() {
        this.productManager = window.productManager;
        this.cartManager = window.cartManager;
    }

    // 渲染商品卡片
    renderProductCard(product) {
        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-brand">${product.brand}</p>
                    <div class="product-price">
                        ¥${product.price.toLocaleString()}
                    </div>
                    <div class="product-actions">
                        <button class="btn-cart" onclick="addToCart('${product.id}')">
                            <span>加入购物车</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // 加载商品到指定容器（添加淡入动画）
    loadProducts(containerId, productType) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // 显示加载状态
        container.innerHTML = '<div class="loading">正在加载精选商品...</div>';
        
        // 模拟异步加载
        setTimeout(() => {
            const products = this.productManager.getProducts(productType);
            const productsHtml = products.map(product => this.renderProductCard(product)).join('');
            container.innerHTML = productsHtml;
            
            // 添加淡入动画
            const cards = container.querySelectorAll('.product-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 300);
    }

    // 加载所有商品区域
    loadAllProducts() {
        this.loadProducts('digitalProducts', 'digital');
        this.loadProducts('clothesProducts', 'clothes');
        this.loadProducts('sportsProducts', 'sports');
    }
}

function addToCart(productId) {
    const product = window.productManager.getProductById(productId);
    if (product) {
        window.cartManager.addToCart(product);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    if (document.querySelector('.banner-slider')) {
        new BannerSlider();
    }
    
    // 初始化商品展示
    const productDisplay = new ProductDisplay();
    productDisplay.loadAllProducts();
    
    document.head.appendChild(style);
});