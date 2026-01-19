// 购物车管理
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    // 添加商品到购物车
    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.showMessage('商品已添加到购物车！');
    }

    // 从购物车移除商品
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    // 更新商品数量
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart();
                this.updateCartCount();
            }
        }
    }

    // 获取购物车数据
    getCart() {
        return this.cart;
    }

    // 获取商品总数量
    getTotalQuantity() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    // 获取总金额
    getTotalPrice() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // 清空购物车
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
    }

    // 保存到本地存储
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    // 更新购物车数量显示
    updateCartCount() {
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            const totalQuantity = this.getTotalQuantity();
            cartCountElement.textContent = totalQuantity;
            
            // 当数量为0时隐藏红点
            if (totalQuantity === 0) {
                cartCountElement.classList.add('hidden');
            } else {
                cartCountElement.classList.remove('hidden');
            }
        }
    }

    // 显示提示消息
    showMessage(message, type = 'success') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            border-radius: 4px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        // 添加动画样式
        if (!document.querySelector('#messageStyles')) {
            const style = document.createElement('style');
            style.id = 'messageStyles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(messageDiv);
        
        // 2秒后自动移除
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 2000);
    }
}

// 商品数据管理
class ProductManager {
    constructor() {
        this.products = {
            // 数码电子商品
            digital: [
                {
                    id: 'd001',
                    title: 'iPhone 15 Pro Max',
                    brand: 'iPhone',
                    price: 9999,
                    image: 'img/iPhone 15 Pro Max.png',
                    category: 'phone',
                    specs: {
                        '屏幕尺寸': '6.7英寸',
                        '存储容量': '256GB',    
                        '处理器': 'A17 Pro芯片',
                        '摄像头': '4800万像素'
                    }
                },
                {
                    id: 'd002',
                    title: '华为 Mate 60 Pro',
                    brand: '华为',
                    price: 6999,
                    image: 'img/华为 Mate 60 Pro.png',
                    category: 'phone',
                    specs: {
                        '屏幕尺寸': '6.82英寸',
                        '存储容量': '512GB',
                        '处理器': '麒麟9000S',
                        '摄像头': '5000万像素'
                    }
                },
                {
                    id: 'd003',
                    title: 'MacBook Pro M3',
                    brand: 'Apple',
                    price: 14999,
                    image: 'img/MacBook Pro M3.png',
                    category: 'laptop',
                    specs: {
                        '屏幕尺寸': '14.2英寸',
                        '处理器': 'M3芯片',
                        '内存': '16GB',
                        '存储': '512GB SSD'
                    }
                },
                {
                    id: 'd004',
                    title: '小米13 Ultra',
                    brand: '小米',
                    price: 5999,
                    image: 'img/小米13 Ultra.png',
                    category: 'phone',
                    specs: {
                        '屏幕尺寸': '6.73英寸',
                        '存储容量': '512GB',
                        '处理器': '骁龙8 Gen2',
                        '摄像头': '5000万像素'
                    }
                },
                {
                    id: 'd005',
                    title: 'iPad Pro 12.9英寸 M2',
                    brand: 'Apple',
                    price: 8999,
                    image: 'img/iPad Pro 12.9英寸 M2.png',
                    category: 'tablet',
                    specs: {
                        '屏幕尺寸': '12.9英寸',
                        '处理器': 'M2芯片',
                        '存储': '256GB',
                        '连接': 'Wi-Fi + 蜂窝网络'
                    }
                },
                {
                    id: 'd006',
                    title: 'Sony WH-1000XM5 降噪耳机',
                    brand: 'Sony',
                    price: 2399,
                    image: 'img/Sony WH-1000XM5 降噪耳机.png',
                    category: 'headphone',
                    specs: {
                        '类型': '头戴式无线耳机',
                        '降噪': '主动降噪',
                        '续航': '30小时',
                        '连接': '蓝牙5.2'
                    }
                },
                {
                    id: 'd007',
                    title: 'Dell XPS 13 超极本',
                    brand: 'Dell',
                    price: 8999,
                    image: 'img/Dell XPS 13 超极本.png',
                    category: 'laptop',
                    specs: {
                        '屏幕尺寸': '13.4英寸',
                        '处理器': 'Intel i7-1360P',
                        '内存': '16GB',
                        '存储': '512GB SSD'
                    }
                },
                {
                    id: 'd008',
                    title: 'Samsung Galaxy S24 Ultra',
                    brand: 'Samsung',
                    price: 7999,
                    image: 'img/Samsung Galaxy S24 Ultra.png',
                    category: 'phone',
                    specs: {
                        '屏幕尺寸': '6.8英寸',
                        '存储容量': '256GB',
                        '处理器': '骁龙8 Gen3',
                        '摄像头': '2亿像素'
                    }
                }
            ],
            // 服装鞋帽商品
            clothes: [
                {
                    id: 'c001',
                    title: 'Nike Air Force 1 经典白色运动鞋',
                    brand: 'Nike',
                    price: 899,
                    image: 'img/Nike Air Force 1 经典白色运动鞋.png',
                    category: 'shoes',
                    specs: {
                        '尺码': '36-45',
                        '颜色': '白色',
                        '材质': '真皮+橡胶',
                        '风格': '休闲运动'
                    }
                },
                {
                    id: 'c002',
                    title: '优衣库 HEATTECH 保暖外衣套装',
                    brand: 'Uniqlo',
                    price: 199,
                    image: 'img/优衣库 HEATTECH 保暖外衣套装 .png',
                    category: 'underwear',
                    specs: {
                        '尺码': 'S-XXL',
                        '颜色': '黑色/白色',
                        '材质': '聚酯纤维',
                        '功能': '发热保暖'
                    }
                },
                {
                    id: 'c003',
                    title: 'ZARA 羊毛混纺大衣',
                    brand: 'ZARA',
                    price: 1299,
                    image: 'img/ZARA 羊毛混纺大衣.png',
                    category: 'outerwear',
                    specs: {
                        '尺码': 'XS-XL',
                        '颜色': '驼色',
                        '材质': '羊毛混纺',
                        '风格': '商务休闲'
                    }
                },
                {
                    id: 'c004',
                    title: 'Adidas 三叶草经典卫衣',
                    brand: 'Adidas',
                    price: 599,
                    image: 'img/Adidas 三叶草经典卫衣.png',
                    category: 'tops',
                    specs: {
                        '尺码': 'S-XXL',
                        '颜色': '黑色/灰色',
                        '材质': '纯棉',
                        '风格': '运动休闲'
                    }
                },
                {
                    id: 'c005',
                    title: 'H&M 修身牛仔裤 男装',
                    brand: 'H&M',
                    price: 299,
                    image: 'img/H&M 修身牛仔裤 男装.png',
                    category: 'bottoms',
                    specs: {
                        '尺码': '28-38',
                        '颜色': '深蓝色',
                        '材质': '棉质牛仔布',
                        '版型': '修身直筒'
                    }
                },
                {
                    id: 'c006',
                    title: '李宁 运动休闲鞋 男女同款',
                    brand: '李宁',
                    price: 459,
                    image: 'img/李宁 运动休闲鞋 男女同款.png',
                    category: 'shoes',
                    specs: {
                        '尺码': '35-44',
                        '颜色': '白红配色',
                        '材质': '网布+橡胶',
                        '功能': '透气减震'
                    }
                },
                {
                    id: 'c007',
                    title: '真丝围巾 女士时尚配饰',
                    brand: 'ZARA',
                    price: 199,
                    image: 'img/真丝围巾 女士时尚配饰.png',
                    category: 'accessories',
                    specs: {
                        '尺寸': '90x90cm',
                        '颜色': '多色可选',
                        '材质': '100%真丝',
                        '工艺': '手工卷边'
                    }
                },
                {
                    id: 'c008',
                    title: '优衣库 纯棉T恤 基础款',
                    brand: 'Uniqlo',
                    price: 79,
                    image: 'img/优衣库 纯棉T恤 基础款.png',
                    category: 'tops',
                    specs: {
                        '尺码': 'XS-XXL',
                        '颜色': '多色可选',
                        '材质': '100%纯棉',
                        '版型': '宽松直筒'
                    }
                }
            ],
            // 运动户外商品
            sports: [
                {
                    id: 's001',
                    title: 'Nike Air Max 270 运动鞋',
                    brand: 'Nike',
                    price: 899,
                    image: 'img/Nike Air Max 270 运动鞋.png',
                    category: 'shoes',
                    specs: {
                        '尺码': '36-45',
                        '材质': '网布+合成革',
                        '适用': '跑步/休闲',
                        '颜色': '黑白/红白'
                    }
                },
                {
                    id: 's002',
                    title: 'Adidas 三叶草运动套装',
                    brand: 'Adidas',
                    price: 599,
                    image: 'img/Adidas 三叶草运动套装.png',
                    category: 'clothing',
                    specs: {
                        '尺码': 'S-XXL',
                        '材质': '纯棉',
                        '季节': '春秋',
                        '款式': '连帽卫衣+长裤'
                    }
                },
                {
                    id: 's003',
                    title: '李宁专业羽毛球拍',
                    brand: '李宁',
                    price: 299,
                    image: 'img/李宁专业羽毛球拍.png',
                    category: 'equipment',
                    specs: {
                        '重量': '85g',
                        '材质': '碳纤维',
                        '平衡点': '295mm',
                        '拉线磅数': '20-28磅'
                    }
                },
                {
                    id: 's004',
                    title: '安踏篮球鞋 KT7',
                    brand: '安踏',
                    price: 459,
                    image: 'img/安踏篮球鞋 KT7.png',
                    category: 'shoes',
                    specs: {
                        '尺码': '40-46',
                        '科技': 'A-FLASHFOAM',
                        '适用': '篮球运动',
                        '鞋面': '织物+TPU'
                    }
                },
                {
                    id: 's005',
                    title: 'Under Armour 健身手套',
                    brand: 'Under Armour',
                    price: 159,
                    image: 'img/Under Armour 健身手套.png',
                    category: 'accessories',
                    specs: {
                        '尺码': 'S-XL',
                        '材质': '合成革+网布',
                        '功能': '防滑透气',
                        '适用': '健身训练'
                    }
                },
                {
                    id: 's006',
                    title: 'Puma 跑步紧身裤',
                    brand: 'Puma',
                    price: 299,
                    image: 'img/Puma 跑步紧身裤.png',
                    category: 'clothing',
                    specs: {
                        '尺码': 'XS-XL',
                        '材质': '聚酯纤维+氨纶',
                        '功能': '速干透气',
                        '适用': '跑步训练'
                    }
                },
                {
                    id: 's007',
                    title: '户外登山背包 50L',
                    brand: 'Nike',
                    price: 699,
                    image: 'img/户外登山背包 50L.png',
                    category: 'outdoor',
                    specs: {
                        '容量': '50L',
                        '材质': '尼龙+涤纶',
                        '功能': '防水透气',
                        '适用': '登山徒步'
                    }
                }
            ]
        }
    }
    
    // 获取指定类型的商品
    getProducts(type) {
        switch(type) {
            case 'digital':
                return this.products.digital.slice(0, 4); // 首页显示4个
            case 'clothes':
                return this.products.clothes.slice(0, 4);
            case 'sports':
                return this.products.sports.slice(0, 4);
            default:
                return [];
        }
    }

    // 根据ID获取商品
    getProductById(id) {
        const allProducts = [...this.products.digital, ...this.products.clothes, ...this.products.sports];
        return allProducts.find(product => product.id === id);
    }

    // 获取所有商品
    getAllProducts() {
        return {
            digital: this.products.digital,
            clothes: this.products.clothes,
            sports: this.products.sports
        };
    }
}

// 全局实例
window.cartManager = new CartManager();
window.productManager = new ProductManager();
