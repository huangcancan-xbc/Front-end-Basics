// 客户评价自动轮播功能
class TestimonialSlider {
    constructor() {
        this.sliderWrapper = document.querySelector('.slider-wrapper');
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.slider-prev');
        this.nextBtn = document.querySelector('.slider-next');
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 1000; // 1秒自动切换
        
        this.init();
    }
    
    init() {
        // 初始化轮播
        this.updateSlider();
        this.bindEvents();
        this.startAutoPlay();
    }
    
    // 更新轮播位置
    updateSlider() {
        if (this.sliderWrapper) {
            this.sliderWrapper.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }
        
        // 更新圆点状态
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // 下一张
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.updateSlider();
    }
    
    // 上一张
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.updateSlider();
    }
    
    // 跳转到指定幻灯片
    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
    }
    
    // 开始自动播放
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    // 停止自动播放
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    // 绑定事件
    bindEvents() {
        // 下一张按钮
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.nextSlide();
                this.startAutoPlay();
            });
        }
        
        // 上一张按钮
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.prevSlide();
                this.startAutoPlay();
            });
        }
        
        // 圆点点击
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.stopAutoPlay();
                this.goToSlide(index);
                this.startAutoPlay();
            });
        });
        
        // 鼠标悬停时暂停自动播放
        const sliderContainer = document.querySelector('.testimonials-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                this.stopAutoPlay();
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        }
        
        // 触摸设备支持
        if (this.sliderWrapper) {
            let touchStartX = 0;
            let touchEndX = 0;
            
            this.sliderWrapper.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            this.sliderWrapper.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipeGesture();
            });
        }
    }
    
    // 处理滑动手势
    handleSwipeGesture() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            this.stopAutoPlay();
            
            if (diff > 0) {
                // 向左滑动，显示下一张
                this.nextSlide();
            } else {
                // 向右滑动，显示上一张
                this.prevSlide();
            }
            
            this.startAutoPlay();
        }
    }
}

// 页面加载完成后初始化轮播
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否存在客户评价轮播
    if (document.querySelector('.testimonials-slider')) {
        new TestimonialSlider();
    }
});