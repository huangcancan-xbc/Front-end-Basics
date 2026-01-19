// 运动户外页面功能
class SportsPage {
    constructor() {
        this.cartManager = window.cartManager;
        this.productManager = window.productManager;
        this.currentFilters = {
            brand: 'all',
            category: 'all',
            price: 'all'
        };
        this.currentSort = 'default';
        this.currentPage = 1;
        this.pageSize = 12;
        this.allProducts = [];
        this.filteredProducts = [];
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.bindEvents();
        this.updateCartDisplay();
    }

    // 加载商品数据
    loadProducts() {
        // 从ProductManager获取运动商品数据
        this.allProducts = this.productManager.products.sports || [];
        this.applyFilters();
    }

    // 绑定事件
    bindEvents() {
        // 筛选器事件
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterType = e.target.dataset.brand ? 'brand' : 
                                 e.target.dataset.category ? 'category' : 'price';
                const filterValue = e.target.dataset.brand || e.target.dataset.category || e.target.dataset.price;
                
                // 更新按钮状态
                e.target.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // 更新筛选条件
                this.currentFilters[filterType] = filterValue;
                this.currentPage = 1;
                this.applyFilters();
            });
        });
        
        // 排序事件
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.currentPage = 1;
            this.applyFilters();
        });
        
        // 加载更多事件
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.currentPage++;
            this.renderProducts(false);
        });
    }

    // 应用筛选和排序
    applyFilters() {
        let filtered = [...this.allProducts];
        
        // 品牌筛选
        if (this.currentFilters.brand !== 'all') {
            filtered = filtered.filter(product => product.brand === this.currentFilters.brand);
        }
        
        // 分类筛选
        if (this.currentFilters.category !== 'all') {
            filtered = filtered.filter(product => product.category === this.currentFilters.category);
        }
        
        // 价格筛选
        if (this.currentFilters.price !== 'all') {
            const [min, max] = this.currentFilters.price.includes('+') ? 
                [parseInt(this.currentFilters.price), Infinity] :
                this.currentFilters.price.split('-').map(p => parseInt(p));
            
            filtered = filtered.filter(product => {
                return product.price >= min && (max === undefined || product.price <= max);
            });
        }
        
        // 排序
        switch (this.currentSort) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                // 按ID排序，假设ID越大越新
                filtered.sort((a, b) => b.id.localeCompare(a.id));
                break;
            default:
                // 默认排序
                break;
        }
        
        this.filteredProducts = filtered;
        this.renderProducts(true);
    }

    // 渲染商品
    renderProducts(reset = false) {
        const container = document.getElementById('productsGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (reset) {
            container.innerHTML = '';
            this.currentPage = 1;
        }
        
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);
        
        if (productsToShow.length === 0 && reset) {
            container.innerHTML = `
                <div class="no-results">
                    <h3>暂无相关商品</h3>
                    <p>请尝试调整筛选条件</p>
                </div>
            `;
            loadMoreBtn.style.display = 'none';
            document.getElementById('productsCount').textContent = '0';
            return;
        }
        
        productsToShow.forEach(product => {
            const productCard = this.createProductCard(product);
            container.appendChild(productCard);
        });
        
        // 更新商品数量显示
        document.getElementById('productsCount').textContent = this.filteredProducts.length;
        
        // 控制加载更多按钮显示
        if (endIndex >= this.filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // 创建商品卡片 - 适配main.js的数据结构
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const specsHtml = Object.entries(product.specs)
            .slice(0, 3)
            .map(([key, value]) => `<span class="spec-item">${key}: ${value}</span>`)
            .join('');
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" onerror="this.src='img/腾飞优品logo.png'">
            </div>
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-brand">${product.brand}</div>
                <div class="product-price">
                    <span class="current-price">¥${product.price}</span>
                </div>
                <div class="product-specs">
                    ${specsHtml}
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="sportsPage.addToCart('${product.id}')">加入购物车</button>
                </div>
            </div>
        `;
        
        return card;
    }

    // 添加到购物车
    addToCart(productId) {
        const product = this.allProducts.find(p => p.id === productId);
        if (product && this.cartManager) {
            this.cartManager.addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                brand: product.brand
            });
            this.updateCartDisplay();
        }
    }

    // 更新购物车显示
    updateCartDisplay() {
        if (this.cartManager) {
            const cartCount = this.cartManager.getTotalQuantity();
            const cartCountElement = document.getElementById('cartCount');
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
            }
        }
    }
}

// 页面加载完成后初始化
let sportsPage;
document.addEventListener('DOMContentLoaded', function() {
    sportsPage = new SportsPage();
});