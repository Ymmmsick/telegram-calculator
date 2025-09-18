// Telegram Mini App 集成
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否在 Telegram 环境中运行
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // 初始化 Mini App
        tg.ready();
        
        // 展开到全屏
        tg.expand();
        
        // 设置主题颜色
        tg.setHeaderColor('secondary_bg_color');
        
        // 启用平滑过渡
        tg.enableClosingConfirmation();
        
        // 设置主按钮（可选 - 用于分享结果）
        tg.MainButton.text = "分享结果";
        tg.MainButton.color = "#007acc";
        
        // 主按钮点击事件
        tg.MainButton.onClick(function() {
            const currentResult = document.getElementById('current-operand').innerText;
            if (currentResult && currentResult !== '0') {
                // 发送计算结果到聊天
                tg.sendData(JSON.stringify({
                    action: 'share_result',
                    result: currentResult,
                    timestamp: new Date().toISOString()
                }));
                
                // 显示成功提示
                tg.showPopup({
                    title: '分享成功',
                    message: `计算结果 ${currentResult} 已分享到聊天`,
                    buttons: [{
                        type: 'ok'
                    }]
                });
            } else {
                tg.showAlert('请先进行计算再分享结果');
            }
        });
        
        // 监听计算结果变化，控制主按钮显示
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    const currentResult = document.getElementById('current-operand').innerText;
                    if (currentResult && currentResult !== '0' && currentResult !== '') {
                        tg.MainButton.show();
                    } else {
                        tg.MainButton.hide();
                    }
                }
            });
        });
        
        observer.observe(document.getElementById('current-operand'), {
            childList: true,
            characterData: true,
            subtree: true
        });
        
        // 监听 Telegram 主题变化
        tg.onEvent('themeChanged', function() {
            // 可以在这里添加主题变化的处理逻辑
            console.log('主题已更改');
        });
        
        // 监听视口变化
        tg.onEvent('viewportChanged', function(eventData) {
            if (eventData.isStateStable) {
                // 调整布局以适应视口变化
                document.body.style.height = eventData.height + 'px';
            }
        });
        
        // 设置返回按钮
        tg.BackButton.onClick(function() {
            tg.close();
        });
        
        // 在某些操作后显示返回按钮（可选）
        // tg.BackButton.show();
        
        console.log('Telegram Mini App 初始化完成');
        console.log('用户信息:', tg.initDataUnsafe.user);
        console.log('聊天信息:', tg.initDataUnsafe.chat);
        
    } else {
        console.log('不在 Telegram 环境中运行，使用普通浏览器模式');
        
        // 在非 Telegram 环境中隐藏一些特定功能
        // 可以添加一些替代的分享功能
        const shareButton = document.createElement('button');
        shareButton.textContent = '复制结果';
        shareButton.className = 'btn btn-share';
        shareButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #007acc;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            display: none;
        `;
        
        document.body.appendChild(shareButton);
        
        // 监听计算结果变化
        const observer = new MutationObserver(function(mutations) {
            const currentResult = document.getElementById('current-operand').innerText;
            if (currentResult && currentResult !== '0' && currentResult !== '') {
                shareButton.style.display = 'block';
            } else {
                shareButton.style.display = 'none';
            }
        });
        
        observer.observe(document.getElementById('current-operand'), {
            childList: true,
            characterData: true,
            subtree: true
        });
        
        // 复制结果到剪贴板
        shareButton.addEventListener('click', function() {
            const currentResult = document.getElementById('current-operand').innerText;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(currentResult).then(function() {
                    shareButton.textContent = '已复制!';
                    setTimeout(function() {
                        shareButton.textContent = '复制结果';
                    }, 2000);
                });
            }
        });
    }
});

// 工具函数：格式化数字显示
function formatNumberForTelegram(number) {
    return number.toLocaleString('zh-CN', {
        maximumFractionDigits: 8,
        useGrouping: true
    });
}

// 工具函数：验证计算结果
function validateCalculationResult(result) {
    if (isNaN(result) || !isFinite(result)) {
        return false;
    }
    return true;
}