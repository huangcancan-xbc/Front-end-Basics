// 案例展示页面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // 获取筛选按钮和案例项目
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseItems = document.querySelectorAll('.case-item');
    
    console.log('找到筛选按钮数量:', filterButtons.length);
    console.log('找到案例项目数量:', caseItems.length);
    
    // 为每个筛选按钮添加点击事件
    filterButtons.forEach(function(button, index) {
        console.log('为按钮', index, '添加事件:', button.textContent);
        
        button.addEventListener('click', function() {
            console.log('点击了按钮:', this.textContent);
            
            // 移除所有按钮的active类
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            // 为当前按钮添加active类
            this.classList.add('active');
            
            // 获取筛选值
            const filterValue = this.getAttribute('data-filter');
            console.log('筛选值:', filterValue);
            
            // 筛选案例
            let visibleCount = 0;
            caseItems.forEach(function(item, itemIndex) {
                const category = item.getAttribute('data-category');
                console.log('案例', itemIndex, '分类:', category);
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    visibleCount++;
                    console.log('显示案例:', itemIndex);
                } else {
                    item.style.display = 'none';
                    console.log('隐藏案例:', itemIndex);
                }
            });
            
            console.log('可见案例数量:', visibleCount);
        });
    });
    
    // 查看详情按钮
    const viewButtons = document.querySelectorAll('.view-case');
    viewButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            alert('案例详情功能正在开发中...');
        });
    });
    
});