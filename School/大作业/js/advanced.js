// 高级交互功能 - 智联未来



// 智能场景切换
class SceneSwitcher {
    constructor() {
        this.sceneTabs = document.querySelectorAll('.scene-tab');
        this.scenePanels = document.querySelectorAll('.scene-panel');
        this.init();
    }
    
    init() {
        this.sceneTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetScene = tab.dataset.scene;
                this.switchScene(targetScene);
            });
        });
    }
    
    switchScene(targetScene) {
        // 更新标签状态
        this.sceneTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.scene === targetScene) {
                tab.classList.add('active');
            }
        });
        
        // 切换面板
        this.scenePanels.forEach(panel => {
            if (panel.dataset.scene === targetScene) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }
}

// 数字动画
class NumberAnimator {
    constructor() {
        this.observers = new Map();
        this.init();
    }
    
    init() {
        const numbers = document.querySelectorAll('.stat-number[data-target]');
        numbers.forEach(number => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.observers.get(number)) {
                        this.animateNumber(number);
                        this.observers.set(number, true);
                        observer.unobserve(number);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(number);
        });
    }
    
    animateNumber(element, duration = 2000) {
        const target = parseInt(element.dataset.target);
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = this.formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = this.formatNumber(Math.floor(current));
            }
        }, 16);
    }
    
    formatNumber(num) {
        return num.toLocaleString('zh-CN');
    }
}

// 返回顶部按钮
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        if (!this.button) return;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.button.addEventListener('click', () => this.scrollToTop());
    }
    
    handleScroll() {
        if (window.pageYOffset > 300) {
            this.button.classList.add('show');
        } else {
            this.button.classList.remove('show');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// 产品3D旋转控制
class Product3DRotate {
    constructor() {
        this.products = document.querySelectorAll('.product-rotate');
        this.init();
    }
    
    init() {
        this.products.forEach(product => {
            let isHovering = false;
            let rotationY = 0;
            
            const productItem = product.closest('.product-item');
            
            productItem.addEventListener('mouseenter', () => {
                isHovering = true;
                this.rotateOnHover(product, isHovering);
            });
            
            productItem.addEventListener('mouseleave', () => {
                isHovering = false;
                this.rotateOnHover(product, isHovering);
            });
            
            // 鼠标移动控制旋转
            productItem.addEventListener('mousemove', (e) => {
                if (isHovering) {
                    const rect = productItem.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const deltaX = e.clientX - centerX;
                    rotationY = (deltaX / rect.width) * 180;
                    product.style.transform = `rotateY(${rotationY}deg)`;
                }
            });
        });
    }
    
    rotateOnHover(product, isHovering) {
        if (isHovering) {
            product.style.animationPlayState = 'paused';
        } else {
            product.style.animationPlayState = 'running';
        }
    }
}

// 智能设备交互
class SmartDeviceInteraction {
    constructor() {
        this.devices = document.querySelectorAll('.room-item, .office-item, .health-item, .travel-item');
        this.init();
    }
    
    init() {
        this.devices.forEach(device => {
            device.addEventListener('click', () => {
                this.toggleDevice(device);
            });
        });
    }
    
    toggleDevice(device) {
        const currentStatus = device.dataset.status;
        const newStatus = currentStatus === 'on' ? 'off' : 'on';
        device.dataset.status = newStatus;
        
        // 添加切换动画
        device.style.transform = 'scale(0.95)';
        setTimeout(() => {
            device.style.transform = 'scale(1)';
        }, 200);
        
        // 更新视觉效果
        if (newStatus === 'on') {
            device.style.opacity = '1';
        } else {
            device.style.opacity = '0.6';
        }
    }
}

// 平滑滚动
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// 页面加载动画
class PageLoader {
    constructor() {
        this.init();
    }
    
    init() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // 触发数字动画
            setTimeout(() => {
                const numberAnimator = new NumberAnimator();
            }, 500);
        });
    }
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    // 粒子背景
    
    
    // 场景切换
    new SceneSwitcher();
    
    // 数字动画
    new NumberAnimator();
    
    // 返回顶部
    new BackToTop();
    
    // 产品3D旋转
    new Product3DRotate();
    
    // 智能设备交互
    new SmartDeviceInteraction();
    
    // 平滑滚动
    new SmoothScroll();
    
    // 页面加载
    new PageLoader();
});

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

