// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', function() {
    // 注册表单角色选择变化时显示/隐藏管理员验证码字段
    document.getElementById('register-role').addEventListener('change', function() {
        const adminCodeGroup = document.getElementById('admin-code-group');
        if (this.value === 'admin') {
            adminCodeGroup.style.display = 'block';
        } else {
            adminCodeGroup.style.display = 'none';
        }
    });
    
    // 检查是否已登录
    if (isLoggedIn()) {
        const role = getCurrentUserRole();
        if (role === 'admin') {
            showAdminDashboard();
        } else {
            showVisitorDashboard();
        }
    }
});

// 登录函数
function login() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const role = document.getElementById('login-role').value;

    // 从 localStorage 获取已注册用户
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // 检查用户是否存在
    const user = registeredUsers.find(u => 
        u.username === username && 
        u.password === password && 
        u.role === role
    );

    if (user) {
        // 登录成功
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', role);
        localStorage.setItem('username', username);
        
        if (role === 'admin') {
            showAdminDashboard();
        } else {
            showVisitorDashboard();
        }
        showNotification('登录成功');
    } else {
        showNotification('用户名或密码错误', 'error');
    }
}

// 注册函数
function register() {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const confirmPassword = document.getElementById('register-confirm-password').value.trim();
    const role = document.getElementById('register-role').value;
    const adminCode = document.getElementById('admin-code').value.trim();
    
    // 验证输入
    if (!username || !password || !confirmPassword) {
        showNotification('请填写所有字段', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('密码不匹配', 'error');
        return;
    }
    
    if (role === 'admin' && adminCode !== 'ADMIN123') {
        showNotification('管理员验证码错误', 'error');
        return;
    }
    
    // 模拟注册 - 实际应用中这里应该是API调用
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);
    
    if (role === 'admin') {
        showAdminDashboard();
    } else {
        showVisitorDashboard();
    }
    
    showNotification('注册成功');
}

// 显示管理员仪表板
function showAdminDashboard() {
    hideElement('auth-container');
    hideElement('visitor-dashboard');
    hideElement('results-container');
    showElement('admin-dashboard');
    
    // 加载初始数据
    adminViewAll();
}

// 显示游客仪表板
function showVisitorDashboard() {
    hideElement('auth-container');
    hideElement('admin-dashboard');
    hideElement('results-container');
    showElement('visitor-dashboard');
    
    // 初始化搜索字段
    updateSearchFields();
}

// 退出登录
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    
    hideElement('visitor-dashboard');
    hideElement('admin-dashboard');
    hideElement('results-container');
    showElement('auth-container');
    
    // 重置表单
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('register-username').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-confirm-password').value = '';
    document.getElementById('admin-code').value = '';
    
    showNotification('已退出登录');
}