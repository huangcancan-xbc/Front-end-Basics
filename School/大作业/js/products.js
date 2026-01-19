// 产品页面专用JavaScript

// 产品数据
const productsData = {
    'brand1': {
        title: '品牌形象设计',
        description: '为企业提供全方位的品牌视觉识别系统设计，包括企业标志、标准字体、标准色彩、应用系统等。我们的设计团队将深入了解您的企业文化和市场需求，打造独具特色的品牌形象。',
        features: [
            '企业标志设计',
            '视觉识别系统(VI)',
            '品牌应用指导',
            '品牌手册制作',
            '企业文化建设'
        ],
        price: '¥10,000起'
    },
    'brand2': {
        title: '产品包装设计',
        description: '专业的产品包装设计服务，从概念创意到最终落地，为您的产品打造吸引消费者的外观设计。我们注重包装的功能性与美观性完美结合。',
        features: [
            '包装结构设计',
            '视觉创意设计',
            '材料选择建议',
            '生产工艺指导',
            '包装测试优化'
        ],
        price: '¥5,000起'
    },
    'web1': {
        title: '企业官网设计',
        description: '专业的企业网站设计与开发服务，采用最新的前端技术，打造响应式、用户友好的企业官网。我们注重网站的视觉效果和用户体验。',
        features: [
            '响应式网页设计',
            'SEO优化',
            '内容管理系统',
            '网站安全防护',
            '技术支持维护'
        ],
        price: '¥15,000起'
    },
    'web2': {
        title: '电商平台开发',
        description: '全功能的电商平台开发服务，包括商品管理、订单处理、支付集成、物流跟踪等完整电商解决方案。助力企业快速开展线上业务。',
        features: [
            '购物车系统',
            '支付系统集成',
            '订单管理',
            '库存管理',
            '数据分析报表'
        ],
        price: '¥25,000起'
    },
    'app1': {
        title: '移动应用UI设计',
        description: '专业的移动应用界面设计服务，注重用户体验和界面美观性。我们的设计团队将为您打造符合现代审美的APP界面。',
        features: [
            '界面视觉设计',
            '交互原型制作',
            '用户体验优化',
            '设计规范制定',
            '适配多分辨率'
        ],
        price: '¥8,000起'
    },
    'app2': {
        title: '小程序开发',
        description: '微信小程序和支付宝小程序开发服务，为您提供轻量级的移动应用解决方案。小程序无需下载安装，即用即走，用户体验极佳。',
        features: [
            '小程序界面设计',
            '功能开发实现',
            '接口对接集成',
            '性能优化',
            '发布上线支持'
        ],
        price: '¥12,000起'
    },
    'marketing1': {
        title: '宣传册设计',
        description: '专业的企业宣传册设计服务，包括企业介绍册、产品手册、画册等。我们注重内容的组织编排和视觉表现力。',
        features: [
            '内容策划编辑',
            '版式设计排版',
            '图片处理优化',
            '印刷工艺建议',
            '制作质量把控'
        ],
        price: '¥3,000起'
    },
    'marketing2': {
        title: '海报设计',
        description: '创意海报设计服务，包括活动宣传海报、产品推广海报、品牌形象海报等。我们注重海报的视觉冲击力和信息传达效果。',
        features: [
            '创意概念设计',
            '视觉表现设计',
            '文案创意撰写',
            '多尺寸适配',
            '印刷制作指导'
        ],
        price: '¥1,000起'
    }
};

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 产品筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            productItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    // 重新添加动画
                    item.style.animation = 'none';
                    setTimeout(() => {
                        item.style.animation = 'fadeInUp 0.6s ease';
                    }, 10);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // 产品详情模态框
    const modal = document.getElementById('productModal');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const closeModal = document.querySelector('.close-modal');

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const productId = productItem.querySelector('.product-info h3').textContent;
            
            // 根据产品标题找到对应的产品数据
            let productKey = '';
            for (let key in productsData) {
                if (productsData[key].title === productId) {
                    productKey = key;
                    break;
                }
            }

            if (productKey && productsData[productKey]) {
                showProductDetails(productsData[productKey], productItem.querySelector('.product-image img').src);
            }
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 显示产品详情
    function showProductDetails(product, imageSrc) {
        const modalImage = modal.querySelector('.modal-image img');
        const modalTitle = modal.querySelector('.modal-info h2');
        const modalDescription = modal.querySelector('.modal-info > p');
        const modalFeatures = modal.querySelector('.modal-features ul');
        const modalPrice = modal.querySelector('.modal-price');

        modalImage.src = imageSrc;
        modalImage.alt = product.title;
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;
        modalPrice.textContent = product.price;

        // 清空并重新填充产品特点
        modalFeatures.innerHTML = '';
        product.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeatures.appendChild(li);
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // 产品卡片悬停效果增强
    productItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 立即咨询按钮
    const consultButtons = document.querySelectorAll('.modal-info .btn-primary');
    consultButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productTitle = modal.querySelector('.modal-info h2').textContent;
            showNotification(`感谢您对"${productTitle}"的关注！我们的客服人员将尽快与您联系。`, 'success');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // 通知函数
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // 滚动显示动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 为产品卡片和优势卡片添加观察
    document.querySelectorAll('.product-item, .advantage-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });

    // 键盘导航支持
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 产品筛选动画
    let currentFilter = 'all';
    function animateFilterChange(newFilter) {
        if (currentFilter === newFilter) return;
        
        productItems.forEach((item, index) => {
            item.style.animation = 'none';
            setTimeout(() => {
                if (newFilter === 'all' || item.getAttribute('data-category') === newFilter) {
                    item.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s`;
                    item.style.animationFillMode = 'both';
                }
            }, 10);
        });
        
        currentFilter = newFilter;
    }

    // 重新绑定筛选按钮事件，添加动画
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            animateFilterChange(filterValue);
        });
    });
});