// 程序为 sum.js

// 通过id号获取页面元素的通用函数
function $(id) {
    return document.getElementById(id);
}

// 计算累加和的函数
function sum(n1, n2) {
    let total = 0;
    for (let i = n1; i <= n2; i++) {
        total += i;
    }
    return total;
}

// 回填显示累加和的函数
function show() {
    // 获取起始数和终止数
    let startNum = $("start_num").value;
    let endNum = $("end_num").value;
    
    // 检查是否输入了数据
    if (startNum === "" || endNum === "") {
        alert("请输入起始数和终止数！");
        $("start_num").focus();
        return;
    }
    
    // 转换为数字
    startNum = parseInt(startNum);
    endNum = parseInt(endNum);
    
    // 检查输入是否为有效数字
    if (isNaN(startNum) || isNaN(endNum)) {
        alert("请输入有效的数字！");
        $("start_num").value = "";
        $("end_num").value = "";
        $("start_num").focus();
        return;
    }
    
    // 检查起始数是否大于0
    if (startNum <= 0) {
        alert("起始数必须大于0！");
        $("start_num").value = "";
        $("end_num").value = "";
        $("start_num").focus();
        return;
    }
    
    // 检查终止数是否大于0
    if (endNum <= 0) {
        alert("终止数必须大于0！");
        $("start_num").value = "";
        $("end_num").value = "";
        $("start_num").focus();
        return;
    }
    
    // 检查起始数是否小于终止数
    if (startNum >= endNum) {
        alert("起始数必须小于终止数！");
        $("start_num").value = "";
        $("end_num").value = "";
        $("start_num").focus();
        return;
    }
    
    // 计算累加和并显示结果
    let result = sum(startNum, endNum);
    $("sum").value = result;
}