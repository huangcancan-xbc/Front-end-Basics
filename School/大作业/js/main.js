// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接时关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 导航栏滚动效果
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScrollTop = scrollTop;
    });



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

    // 为需要动画的元素添加观察
    document.querySelectorAll('.feature-card, .case-item, .testimonial-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 表单提交处理
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                showNotification('感谢订阅！我们会定期向您发送最新资讯。', 'success');
                this.reset();
            } else {
                showNotification('请输入有效的邮箱地址。', 'error');
            }
        });
    }

    // 邮箱验证函数
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

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

    // 案例和评价轮播图
    const casesCarousel = document.querySelector('.cases-carousel');
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    
    if (casesCarousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        casesCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            casesCarousel.style.cursor = 'grabbing';
            startX = e.pageX - casesCarousel.offsetLeft;
            scrollLeft = casesCarousel.scrollLeft;
        });

        casesCarousel.addEventListener('mouseleave', () => {
            isDown = false;
            casesCarousel.style.cursor = 'grab';
        });

        casesCarousel.addEventListener('mouseup', () => {
            isDown = false;
            casesCarousel.style.cursor = 'grab';
        });

        casesCarousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - casesCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            casesCarousel.scrollLeft = scrollLeft - walk;
        });
    }

    if (testimonialsCarousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        testimonialsCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialsCarousel.style.cursor = 'grabbing';
            startX = e.pageX - testimonialsCarousel.offsetLeft;
            scrollLeft = testimonialsCarousel.scrollLeft;
        });

        testimonialsCarousel.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialsCarousel.style.cursor = 'grab';
        });

        testimonialsCarousel.addEventListener('mouseup', () => {
            isDown = false;
            testimonialsCarousel.style.cursor = 'grab';
        });

        testimonialsCarousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsCarousel.scrollLeft = scrollLeft - walk;
        });
    }

    // 页面加载完成后的初始化
    window.addEventListener('load', function() {
        // 移除预加载器（如果有的话）
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    });

    // 性能优化：节流函数
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

    // 优化滚动事件
    window.addEventListener('scroll', throttle(function() {
        // 滚动相关的优化处理
    }, 100));
});