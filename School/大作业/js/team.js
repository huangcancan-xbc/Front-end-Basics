// 团队介绍页面专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 团队成员卡片悬停效果
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 社交链接点击效果
    const socialLinks = document.querySelectorAll('.member-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const memberName = this.closest('.team-member').querySelector('h3').textContent;
            showNotification(`正在查看 ${memberName} 的社交资料`, 'info');
        });
    });

    // 加入我们表单提交
    const joinForm = document.querySelector('.join-form form');
    
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const position = this.querySelector('select').value;
            
            if (name && email && position) {
                showNotification('申请已提交！我们会尽快与您联系。', 'success');
                this.reset();
            } else {
                showNotification('请填写完整的申请信息。', 'error');
            }
        });
    }

    // 通知函数
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        const bgColor = type === 'success' ? '#27ae60' : 
                        type === 'error' ? '#e74c3c' : '#00d4ff';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${bgColor};
            color: white;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
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

    // 为团队成员卡片和文化卡片添加观察
    document.querySelectorAll('.team-member, .culture-item, .feature-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });

    // 团队成员照片悬停效果
    const memberPhotos = document.querySelectorAll('.member-photo');
    
    memberPhotos.forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            img.style.filter = 'brightness(0.8)';
        });

        photo.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.filter = 'brightness(1)';
        });
    });

    // 文化图标动画
    const cultureIcons = document.querySelectorAll('.culture-icon');
    
    cultureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // 表单输入框焦点效果
    const formInputs = document.querySelectorAll('.join-form input, .join-form select, .join-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    

});