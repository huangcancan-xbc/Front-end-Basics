// 新闻动态页面专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 新闻分类筛选功能
    const categoryButtons = document.querySelectorAll('.category-btn');
    const newsItems = document.querySelectorAll('.news-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的激活状态
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // 为当前按钮添加激活状态
            this.classList.add('active');
            
            // 获取要显示的分类
            const category = this.getAttribute('data-category');
            
            // 筛选新闻项
            newsItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // 新闻项悬停效果
    newsItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
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
    
    // 为新闻项添加观察
    newsItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(item);
    });
});