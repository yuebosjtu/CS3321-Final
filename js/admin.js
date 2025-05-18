// 管理员查看所有数据
function adminViewAll() {
    const table = document.getElementById('admin-table').value;
    const mockData = getMockData(table);
    displayAdminData(table, mockData);
}

// 显示管理员数据
function displayAdminData(table, data) {
    const fields = loadTableFields(table);
    const thead = document.querySelector('#admin-data-display thead');
    const tbody = document.querySelector('#admin-data-display tbody');
    
    // 清除现有内容
    thead.innerHTML = '';
    tbody.innerHTML = '';
    
    // 添加表头 - 包括选择框
    const headerRow = document.createElement('tr');
    
    // 添加选择列
    const selectTh = document.createElement('th');
    selectTh.innerHTML = '<input type="checkbox" id="select-all">';
    headerRow.appendChild(selectTh);
    
    // 添加数据列
    fields.forEach(field => {
        const th = document.createElement('th');
        th.textContent = getFieldDisplayName(field);
        headerRow.appendChild(th);
    });
    
    // 添加操作列
    const actionTh = document.createElement('th');
    actionTh.textContent = '操作';
    headerRow.appendChild(actionTh);
    
    thead.appendChild(headerRow);
    
    // 添加数据行
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        
        // 添加选择框
        const selectTd = document.createElement('td');
        selectTd.innerHTML = `<input type="checkbox" class="select-row" data-id="${item[fields[0]]}">`;
        row.appendChild(selectTd);
        
        // 添加数据单元格
        fields.forEach(field => {
            const td = document.createElement('td');
            td.textContent = item[field] || '-';
            row.appendChild(td);
        });
        
        // 添加操作按钮
        const actionTd = document.createElement('td');
        actionTd.innerHTML = `
            <button class="btn" onclick="editRow('${table}', ${index})">编辑</button>
            <button class="btn btn-danger" onclick="deleteRow('${table}', '${item[fields[0]]}')">删除</button>
        `;
        row.appendChild(actionTd);
        
        tbody.appendChild(row);
    });
    
    // 全选/取消全选
    document.getElementById('select-all').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.select-row');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
}

// 更新管理员字段选择
function updateAdminFields() {
    // 当表更改时刷新显示的数据
    adminViewAll();
}

// 显示添加数据表单
function showAddForm() {
    const table = document.getElementById('add-table').value;
    const formContainer = document.getElementById('add-data-form');
    
    if (!table) {
        formContainer.innerHTML = '<p>请选择要添加数据的数据表</p>';
        return;
    }
    
    const fields = loadTableFields(table);
    let formHTML = '<form id="add-data-form-content">';
    
    fields.forEach(field => {
        // 跳过ID字段，因为通常是自动生成的
        if (field.endsWith('_id') && field !== 'patient_id' && field !== 'doctor_id') {
            return;
        }
        
        formHTML += `
            <div class="form-group">
                <label for="add-${field}">${getFieldDisplayName(field)}</label>
        `;
        
        // 特殊字段处理
        if (field === 'gender') {
            formHTML += `
                <select id="add-${field}">
                    <option value="男">男</option>
                    <option value="女">女</option>
                    <option value="其他">其他</option>
                </select>
            `;
        } else if (field === 'date_of_birth' || field.endsWith('_date') || field === 'expiry_date') {
            formHTML += `<input type="date" id="add-${field}">`;
        } else if (field === 'appointment_time' || field === 'pickup_time' || field === 'dropoff_time' || field === 'service_time') {
            formHTML += `<input type="time" id="add-${field}">`;
        } else if (field === 'notes' || field === 'medical_history' || field === 'diagnosis' || field === 'treatment') {
            formHTML += `<textarea id="add-${field}" rows="3"></textarea>`;
        } else {
            formHTML += `<input type="text" id="add-${field}" placeholder="输入${getFieldDisplayName(field)}">`;
        }
        
        formHTML += `</div>`;
    });
    
    formHTML += `
        <button type="button" class="btn" onclick="submitAddForm('${table}')">添加</button>
        </form>
    `;
    
    formContainer.innerHTML = formHTML;
}

// 提交添加表单
function submitAddForm(table) {
    const fields = loadTableFields(table);
    const newData = {};
    
    // 收集表单数据
    fields.forEach(field => {
        const input = document.getElementById(`add-${field}`);
        if (input) {
            newData[field] = input.value;
        }
    });
    
    // 简单验证
    for (const field in newData) {
        if (!newData[field] && !field.endsWith('_id')) {
            showNotification(`请填写${getFieldDisplayName(field)}`, 'error');
            return;
        }
    }
    
    // 模拟添加数据 - 实际应用中这里应该是API调用
    const mockData = getMockData(table);
    mockData.push(newData);
    
    showNotification('数据添加成功');
    showAddForm(); // 刷新表单
    
    // 如果当前在管理该表，刷新显示
    if (document.getElementById('admin-table').value === table) {
        adminViewAll();
    }
}

// 编辑行
function editRow(table, rowIndex) {
    const mockData = getMockData(table);
    const rowData = mockData[rowIndex];
    const fields = loadTableFields(table);
    
    let editHTML = `
        <h3>编辑 ${table} 记录</h3>
        <form id="edit-data-form">
    `;
    
    fields.forEach(field => {
        editHTML += `
            <div class="form-group">
                <label for="edit-${field}">${getFieldDisplayName(field)}</label>
        `;
        
        // 特殊字段处理
        if (field === 'gender') {
            editHTML += `
                <select id="edit-${field}">
                    <option value="男" ${rowData[field] === '男' ? 'selected' : ''}>男</option>
                    <option value="女" ${rowData[field] === '女' ? 'selected' : ''}>女</option>
                    <option value="其他" ${rowData[field] === '其他' ? 'selected' : ''}>其他</option>
                </select>
            `;
        } else if (field === 'date_of_birth' || field.endsWith('_date') || field === 'expiry_date') {
            editHTML += `<input type="date" id="edit-${field}" value="${rowData[field] || ''}">`;
        } else if (field === 'appointment_time' || field === 'pickup_time' || field === 'dropoff_time' || field === 'service_time') {
            editHTML += `<input type="time" id="edit-${field}" value="${rowData[field] || ''}">`;
        } else if (field === 'notes' || field === 'medical_history' || field === 'diagnosis' || field === 'treatment') {
            editHTML += `<textarea id="edit-${field}" rows="3">${rowData[field] || ''}</textarea>`;
        } else {
            editHTML += `<input type="text" id="edit-${field}" value="${rowData[field] || ''}" ${field.endsWith('_id') ? 'readonly' : ''}>`;
        }
        
        editHTML += `</div>`;
    });
    
    editHTML += `
        <button type="button" class="btn" onclick="submitEditForm('${table}', ${rowIndex})">保存</button>
        <button type="button" class="btn btn-danger" onclick="cancelEdit()">取消</button>
        </form>
    `;
    
    document.getElementById('manage-data-section').innerHTML = editHTML;
}

// 提交编辑表单
function submitEditForm(table, rowIndex) {
    const fields = loadTableFields(table);
    const updatedData = {};
    
    // 收集表单数据
    fields.forEach(field => {
        const input = document.getElementById(`edit-${field}`);
        if (input) {
            updatedData[field] = input.value;
        }
    });
    
    // 简单验证
    for (const field in updatedData) {
        if (!updatedData[field] && !field.endsWith('_id')) {
            showNotification(`请填写${getFieldDisplayName(field)}`, 'error');
            return;
        }
    }
    
    // 模拟更新数据 - 实际应用中这里应该是API调用
    const mockData = getMockData(table);
    mockData[rowIndex] = updatedData;
    
    showNotification('数据更新成功');
    adminViewAll(); // 返回数据列表
}

// 取消编辑
function cancelEdit() {
    adminViewAll();
}

// 删除行
function deleteRow(table, id) {
    if (!confirm(`确定要删除这条 ${table} 记录吗？`)) {
        return;
    }
    
    // 模拟删除数据 - 实际应用中这里应该是API调用
    const mockData = getMockData(table);
    const index = mockData.findIndex(item => item[Object.keys(item)[0]] === id);
    
    if (index !== -1) {
        mockData.splice(index, 1);
        showNotification('记录已删除');
        adminViewAll();
    }
}

// 编辑选中行
function adminEditSelected() {
    const checkboxes = document.querySelectorAll('.select-row:checked');
    if (checkboxes.length === 0) {
        showNotification('请至少选择一行进行编辑', 'warning');
        return;
    }
    
    if (checkboxes.length > 1) {
        showNotification('一次只能编辑一行', 'warning');
        return;
    }
    
    const table = document.getElementById('admin-table').value;
    const id = checkboxes[0].getAttribute('data-id');
    const mockData = getMockData(table);
    const index = mockData.findIndex(item => item[Object.keys(item)[0]] === id);
    
    if (index !== -1) {
        editRow(table, index);
    }
}

// 删除选中行
function adminDeleteSelected() {
    const checkboxes = document.querySelectorAll('.select-row:checked');
    if (checkboxes.length === 0) {
        showNotification('请至少选择一行进行删除', 'warning');
        return;
    }
    
    if (!confirm(`确定要删除选中的 ${checkboxes.length} 条记录吗？`)) {
        return;
    }
    
    const table = document.getElementById('admin-table').value;
    const mockData = getMockData(table);
    
    checkboxes.forEach(checkbox => {
        const id = checkbox.getAttribute('data-id');
        const index = mockData.findIndex(item => item[Object.keys(item)[0]] === id);
        
        if (index !== -1) {
            mockData.splice(index, 1);
        }
    });
    
    showNotification(`已删除 ${checkboxes.length} 条记录`);
    adminViewAll();
}

// 显示所有用户
function showAllUsers() {
    // 模拟用户数据
    const users = [
        { username: 'admin', role: 'admin', registerDate: '2022-01-01', lastLogin: '2022-03-20' },
        { username: 'visitor1', role: 'visitor', registerDate: '2022-02-15', lastLogin: '2022-03-18' },
        { username: 'visitor2', role: 'visitor', registerDate: '2022-03-01', lastLogin: '2022-03-19' }
    ];
    
    const tbody = document.querySelector('#user-list tbody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="select-user" data-username="${user.username}"></td>
            <td>${user.username}</td>
            <td>${user.role === 'admin' ? '管理员' : '游客'}</td>
            <td>${formatDate(user.registerDate)}</td>
            <td>${formatDate(user.lastLogin)}</td>
            <td>
                <button class="btn" onclick="editUser('${user.username}')">编辑</button>
                <button class="btn btn-danger" onclick="deleteUser('${user.username}')">删除</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // 全选/取消全选
    document.getElementById('select-all-users').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.select-user');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
}

// 显示添加用户表单
function showAddUserForm() {
    document.getElementById('add-user-form').style.display = 'block';
    document.getElementById('user-list').style.display = 'none';
}

// 添加新用户
function addNewUser() {
    const username = document.getElementById('new-username').value.trim();
    const password = document.getElementById('new-password').value.trim();
    const role = document.getElementById('new-role').value;
    
    if (!username || !password) {
        showNotification('请输入用户名和密码', 'error');
        return;
    }
    
    // 模拟添加用户 - 实际应用中这里应该是API调用
    showNotification(`用户 ${username} 添加成功`);
    
    // 重置表单
    document.getElementById('new-username').value = '';
    document.getElementById('new-password').value = '';
    
    // 返回用户列表
    document.getElementById('add-user-form').style.display = 'none';
    document.getElementById('user-list').style.display = 'block';
    showAllUsers();
}

// 编辑用户
function editUser(username) {
    // 在实际应用中，这里会显示编辑表单
    showNotification(`编辑用户 ${username} (功能待实现)`, 'info');
}

// 删除用户
function deleteUser(username) {
    if (!confirm(`确定要删除用户 ${username} 吗？`)) {
        return;
    }
    
    // 模拟删除用户 - 实际应用中这里应该是API调用
    showNotification(`用户 ${username} 已删除`);
    showAllUsers();
}

// 删除选中用户
function deleteSelectedUsers() {
    const checkboxes = document.querySelectorAll('.select-user:checked');
    if (checkboxes.length === 0) {
        showNotification('请至少选择一个用户进行删除', 'warning');
        return;
    }
    
    if (!confirm(`确定要删除选中的 ${checkboxes.length} 个用户吗？`)) {
        return;
    }
    
    // 模拟删除用户 - 实际应用中这里应该是API调用
    const usernames = Array.from(checkboxes).map(cb => cb.getAttribute('data-username')).join(', ');
    showNotification(`已删除用户: ${usernames}`);
    showAllUsers();
}

// 生成报表
function generateReport() {
    const reportType = document.getElementById('report-type').value;
    const reportPeriod = document.getElementById('report-period').value;
    
    let startDate, endDate;
    if (reportPeriod === 'custom') {
        startDate = document.getElementById('start-date').value;
        endDate = document.getElementById('end-date').value;
        
        if (!startDate || !endDate) {
            showNotification('请选择自定义日期范围', 'error');
            return;
        }
    } else {
        // 模拟日期范围计算
        const today = new Date();
        startDate = formatDate(today);
        
        if (reportPeriod === 'week') {
            const lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 7);
            startDate = formatDate(lastWeek);
        } else if (reportPeriod === 'month') {
            const lastMonth = new Date(today);
            lastMonth.setMonth(today.getMonth() - 1);
            startDate = formatDate(lastMonth);
        } else if (reportPeriod === 'quarter') {
            const lastQuarter = new Date(today);
            lastQuarter.setMonth(today.getMonth() - 3);
            startDate = formatDate(lastQuarter);
        } else if (reportPeriod === 'year') {
            const lastYear = new Date(today);
            lastYear.setFullYear(today.getFullYear() - 1);
            startDate = formatDate(lastYear);
        }
        
        endDate = formatDate(today);
    }
    
    // 模拟报表数据
    let reportData = [];
    let reportTitle = '';
    
    switch (reportType) {
        case 'patient-stats':
            reportTitle = '患者统计报表';
            reportData = [
                { period: '1月', newPatients: 45, returningPatients: 120 },
                { period: '2月', newPatients: 38, returningPatients: 115 },
                { period: '3月', newPatients: 52, returningPatients: 130 }
            ];
            break;
        case 'doctor-appointments':
            reportTitle = '医生预约报表';
            reportData = [
                { doctor: '王医生', specialty: '心脏病学', appointments: 65, completed: 60 },
                { doctor: '赵医生', specialty: '神经外科', appointments: 48, completed: 45 }
            ];
            break;
        case 'billing-summary':
            reportTitle = '账单汇总报表';
            reportData = [
                { month: '1月', totalAmount: 125000, paid: 115000, outstanding: 10000 },
                { month: '2月', totalAmount: 118000, paid: 110000, outstanding: 8000 },
                { month: '3月', totalAmount: 135000, paid: 120000, outstanding: 15000 }
            ];
            break;
        case 'medicine-inventory':
            reportTitle = '药品库存报表';
            reportData = getMockData('Medicine');
            break;
        case 'room-utilization':
            reportTitle = '房间使用率报表';
            reportData = [
                { roomNumber: '101', type: '标准', utilization: '75%' },
                { roomNumber: '102', type: '单人', utilization: '60%' },
                { roomNumber: '201', type: 'VIP', utilization: '45%' }
            ];
            break;
    }
    
    // 显示报表
    const reportResults = document.getElementById('report-results');
    reportResults.innerHTML = `
        <h3>${reportTitle}</h3>
        <p>时间范围: ${startDate} 至 ${endDate}</p>
        <div class="report-table">
            <table>
                <thead>
                    <tr>
                        ${Object.keys(reportData[0]).map(key => `<th>${getFieldDisplayName(key)}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${reportData.map(row => `
                        <tr>
                            ${Object.values(row).map(val => `<td>${val}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <button class="btn" onclick="exportReport()">导出报表</button>
    `;
}

// 导出报表
function exportReport() {
    const reportType = document.getElementById('report-type').value;
    const reportTitle = document.querySelector('#report-results h3').textContent;
    const filename = `${reportTitle}.csv`.replace(/\s+/g, '_');
    
    const table = document.querySelector('#report-results table');
    exportToCSV(table.id, filename);
}