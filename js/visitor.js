// 更新搜索字段选项
function updateSearchFields() {
    const tableSelect = document.getElementById('search-table');
    const fieldSelect = document.getElementById('search-field');
    
    // 清除现有选项
    fieldSelect.innerHTML = '';
    
    // 获取选定表的字段
    const tableName = tableSelect.value;
    const fields = loadTableFields(tableName);
    
    // 添加字段选项
    fields.forEach(field => {
        const option = document.createElement('option');
        option.value = field;
        option.textContent = getFieldDisplayName(field);
        fieldSelect.appendChild(option);
    });
    
    // 监听表选择变化
    tableSelect.addEventListener('change', updateSearchFields);
}

// 执行搜索
function performSearch() {
    const table = document.getElementById('search-table').value;
    const field = document.getElementById('search-field').value;
    const value = document.getElementById('search-value').value.trim();
    
    if (!value) {
        showNotification('请输入查询值', 'error');
        return;
    }
    
    // 模拟搜索 - 实际应用中这里应该是API调用
    const mockData = getMockData(table);
    const results = mockData.filter(item => {
        return String(item[field]).toLowerCase().includes(value.toLowerCase());
    });
    
    if (results.length === 0) {
        showNotification('未找到匹配的结果', 'warning');
    } else {
        showResults(table, field, value, results);
    }
}

// 显示所有患者
function showAllPatients() {
    const table = 'Patients';
    const mockData = getMockData(table);
    showResults(table, 'all', '所有记录', mockData);
}

// 显示所有医生
function showAllDoctors() {
    const table = 'Doctors';
    const mockData = getMockData(table);
    showResults(table, 'all', '所有记录', mockData);
}

// 显示可用房间
function showAvailableRooms() {
    const table = 'Rooms';
    const mockData = getMockData(table).filter(room => room.status === '可用');
    showResults(table, 'status', '可用', mockData);
}

// 显示血库库存
function showBloodStock() {
    const table = 'Blood_Bank';
    const mockData = getMockData(table);
    showResults(table, 'all', '库存', mockData);
}

// 显示查询结果
function showResults(table, field, value, data) {
    // 设置结果标题
    document.getElementById('results-title').textContent = `${table} 查询结果`;
    document.getElementById('results-query').textContent = `查询条件: ${getFieldDisplayName(field)} = ${value}`;
    
    // 获取表头
    const fields = loadTableFields(table);
    const thead = document.querySelector('#results-data thead');
    const tbody = document.querySelector('#results-data tbody');
    
    // 清除现有内容
    thead.innerHTML = '';
    tbody.innerHTML = '';
    
    // 添加表头
    const headerRow = document.createElement('tr');
    fields.forEach(field => {
        const th = document.createElement('th');
        th.textContent = getFieldDisplayName(field);
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    
    // 添加数据行
    data.forEach(item => {
        const row = document.createElement('tr');
        fields.forEach(field => {
            const td = document.createElement('td');
            td.textContent = item[field] || '-';
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    
    // 显示结果页面
    hideElement('visitor-dashboard');
    hideElement('admin-dashboard');
    showElement('results-container');
}

// 返回上一页
function goBack() {
    const role = getCurrentUserRole();
    hideElement('results-container');
    
    if (role === 'admin') {
        showElement('admin-dashboard');
    } else {
        showElement('visitor-dashboard');
    }
}

// 导出结果为CSV
function exportToCSV() {
    const table = document.getElementById('search-table').value;
    const field = document.getElementById('search-field').value;
    const value = document.getElementById('search-value').value.trim();
    const filename = `${table}_${field}_${value}.csv`.replace(/\s+/g, '_');
    
    utils.exportToCSV('results-data', filename);
}

// 打印结果
function printResults() {
    window.print();
}

// 获取模拟数据
function getMockData(table) {
    const mockData = {
        'Patients': [
            {
                patient_id: 'P1001',
                first_name: '张',
                last_name: '三',
                date_of_birth: '1980-05-15',
                gender: '男',
                contact_number: '13800138000',
                address: '北京市朝阳区',
                email: 'zhangsan@example.com',
                medical_history: '高血压',
                created_at: '2022-01-10'
            },
            {
                patient_id: 'P1002',
                first_name: '李',
                last_name: '四',
                date_of_birth: '1975-08-22',
                gender: '女',
                contact_number: '13900139000',
                address: '上海市浦东新区',
                email: 'lisi@example.com',
                medical_history: '糖尿病',
                created_at: '2022-02-15'
            }
        ],
        'Doctors': [
            {
                doctor_id: 'D1001',
                first_name: '王',
                last_name: '医生',
                specialty: '心脏病学',
                contact_number: '13600136000',
                email: 'wang.doctor@hospital.com',
                available_schedule: '周一至周五 9:00-17:00',
                created_at: '2020-05-10'
            },
            {
                doctor_id: 'D1002',
                first_name: '赵',
                last_name: '医生',
                specialty: '神经外科',
                contact_number: '13700137000',
                email: 'zhao.doctor@hospital.com',
                available_schedule: '周二、周四 10:00-18:00',
                created_at: '2019-11-20'
            }
        ],
        'Prescription': [
            {
                prescription_id: 'RX2001',
                patient_id: 'P1001',
                doctor_id: 'D1001',
                prescription_date: '2022-03-10',
                medication_name: '阿司匹林',
                dosage: '100mg',
                frequency: '每日一次',
                duration: '30天',
                notes: '饭后服用'
            }
        ],
        'Appointments': [
            {
                appointment_id: 'A3001',
                patient_id: 'P1001',
                doctor_id: 'D1001',
                appointment_date: '2022-03-15',
                appointment_time: '14:30',
                purpose: '定期检查',
                status: '已完成',
                created_at: '2022-02-28'
            }
        ],
        'Billing': [
            {
                bill_id: 'B4001',
                patient_id: 'P1001',
                appointment_id: 'A3001',
                total_amount: '350.00',
                payment_status: '已支付',
                payment_date: '2022-03-16',
                insurance_provider: '中国人寿'
            }
        ],
        'Blood_Bank': [
            {
                blood_id: 'BB5001',
                blood_type: 'A+',
                stock_quantity: '15',
                last_updated: '2022-03-01'
            },
            {
                blood_id: 'BB5002',
                blood_type: 'O-',
                stock_quantity: '8',
                last_updated: '2022-03-05'
            }
        ],
        'Rooms': [
            {
                room_id: 'R6001',
                room_number: '101',
                room_type_id: 'RT001',
                capacity: '2',
                status: '可用',
                last_serviced: '2022-03-10'
            },
            {
                room_id: 'R6002',
                room_number: '102',
                room_type_id: 'RT002',
                capacity: '1',
                status: '占用',
                last_serviced: '2022-03-08'
            }
        ]
    };
    
    return mockData[table] || [];
}