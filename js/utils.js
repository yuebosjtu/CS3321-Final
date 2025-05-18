// 切换标签页
function switchTab(tabName) {
    // 切换登录/注册标签
    if (tabName === 'login') {
        document.getElementById('login-form').classList.add('active');
        document.getElementById('register-form').classList.remove('active');
        document.querySelector('.tab:nth-child(1)').classList.add('active');
        document.querySelector('.tab:nth-child(2)').classList.remove('active');
    } else if (tabName === 'register') {
        document.getElementById('login-form').classList.remove('active');
        document.getElementById('register-form').classList.add('active');
        document.querySelector('.tab:nth-child(1)').classList.remove('active');
        document.querySelector('.tab:nth-child(2)').classList.add('active');
    }
    
    // 切换管理员部分
    if (tabName === 'manage-data' || tabName === 'add-data' || tabName === 'reports' || tabName === 'user-management') {
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(tabName + '-section').classList.add('active');
        
        document.querySelectorAll('.admin-nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }
}

// 显示/隐藏元素
function showElement(id) {
    document.getElementById(id).style.display = 'block';
}

function hideElement(id) {
    document.getElementById(id).style.display = 'none';
}

// 显示通知
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 验证电子邮件格式
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 格式化日期
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// 获取当前用户角色
function getCurrentUserRole() {
    return localStorage.getItem('userRole');
}

// 检查用户是否登录
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// 加载表格字段
function loadTableFields(tableName) {
    const tableFields = {
        'Patients': ['patient_id', 'first_name', 'last_name', 'date_of_birth', 'gender', 'contact_number', 'address', 'email', 'medical_history', 'created_at'],
        'Prescription': ['prescription_id', 'patient_id', 'doctor_id', 'prescription_date', 'medication_name', 'dosage', 'frequency', 'duration', 'notes'],
        'Doctors': ['doctor_id', 'first_name', 'last_name', 'specialty', 'contact_number', 'email', 'available_schedule', 'created_at'],
        'Appointments': ['appointment_id', 'patient_id', 'doctor_id', 'appointment_date', 'appointment_time', 'purpose', 'status', 'created_at'],
        'Billing': ['bill_id', 'patient_id', 'appointment_id', 'total_amount', 'payment_status', 'payment_date', 'insurance_provider'],
        'Pharmacy': ['pharmacy_id', 'medicine_id', 'patient_id', 'quantity', 'prescription_date'],
        'Room_Assignments': ['assignment_id', 'room_id', 'staff_id', 'patient_id', 'assignment_date', 'end_date'],
        'Ambulance': ['ambulance_id', 'ambulance_number', 'availability', 'driver_id', 'last_service_date'],
        'Ambulance_Log': ['log_id', 'ambulance_id', 'patient_id', 'pickup_location', 'dropoff_location', 'pickup_time', 'dropoff_time', 'status'],
        'Staff': ['staff_id', 'first_name', 'last_name', 'role', 'department_id', 'contact_number', 'email', 'address', 'hire_date'],
        'Workers': ['worker_id', 'staff_id', 'job_title', 'work_schedule'],
        'Nurses': ['nurse_id', 'staff_id', 'specialization', 'shift_hours'],
        'Departments': ['department_id', 'department_name', 'location'],
        'Blood_Bank': ['blood_id', 'blood_type', 'stock_quantity', 'last_updated'],
        'Medical_Records': ['record_id', 'patient_id', 'doctor_id', 'appointment_id', 'diagnosis', 'treatment', 'prescription', 'created_at'],
        'Medicine': ['medicine_id', 'name', 'brand', 'type', 'dosage', 'stock_quantity', 'expiry_date']
    };
    
    return tableFields[tableName] || [];
}

// 获取字段显示名称
function getFieldDisplayName(field) {
    const fieldNames = {
        'patient_id': '患者ID',
        'first_name': '名字',
        'last_name': '姓氏',
        'date_of_birth': '出生日期',
        'gender': '性别',
        'contact_number': '联系电话',
        'address': '地址',
        'email': '邮箱',
        'medical_history': '医疗历史',
        'created_at': '创建时间',
        'prescription_id': '处方ID',
        'doctor_id': '医生ID',
        'prescription_date': '处方日期',
        'medication_name': '药品名称',
        'dosage': '用量',
        'frequency': '频率',
        'duration': '时长',
        'notes': '备注',
        'specialty': '专业领域',
        'available_schedule': '可用时间表',
        'appointment_id': '预约ID',
        'appointment_date': '预约日期',
        'appointment_time': '预约时间',
        'purpose': '目的',
        'status': '状态',
        'bill_id': '账单ID',
        'total_amount': '总金额',
        'payment_status': '支付状态',
        'payment_date': '支付日期',
        'insurance_provider': '保险公司',
        'pharmacy_id': '药房ID',
        'medicine_id': '药品ID',
        'quantity': '数量',
        'assignment_id': '分配ID',
        'room_id': '房间ID',
        'assignment_date': '分配日期',
        'end_date': '结束日期',
        'ambulance_id': '救护车ID',
        'ambulance_number': '救护车编号',
        'availability': '可用性',
        'driver_id': '司机ID',
        'last_service_date': '最后服务日期',
        'log_id': '日志ID',
        'pickup_location': '接载地点',
        'dropoff_location': '下车地点',
        'pickup_time': '接载时间',
        'dropoff_time': '下车时间',
        'staff_id': '员工ID',
        'role': '角色',
        'department_id': '部门ID',
        'hire_date': '雇佣日期',
        'worker_id': '工人ID',
        'job_title': '职位',
        'work_schedule': '工作时间表',
        'nurse_id': '护士ID',
        'specialization': '专业领域',
        'shift_hours': '班次时间',
        'department_name': '部门名称',
        'location': '地点',
        'blood_id': '血液ID',
        'blood_type': '血型',
        'stock_quantity': '库存数量',
        'last_updated': '最后更新时间',
        'record_id': '记录ID',
        'diagnosis': '诊断',
        'treatment': '治疗',
        'prescription': '处方',
        'name': '名称',
        'brand': '品牌',
        'type': '类型',
        'expiry_date': '过期日期'
    };
    
    return fieldNames[field] || field;
}

// 导出为CSV
function exportToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tr');
    let csv = [];
    
    for (let i = 0; i < rows.length; i++) {
        const row = [], cols = rows[i].querySelectorAll('td, th');
        
        for (let j = 0; j < cols.length; j++) {
            row.push(cols[j].innerText);
        }
        
        csv.push(row.join(','));
    }
    
    // 下载CSV文件
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename || 'export.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}