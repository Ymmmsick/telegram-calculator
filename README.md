# Telegram 计算器 Mini App

一个专为 Telegram 设计的计算器小程序，支持基础数学运算，具有现代化的用户界面和完整的 Telegram Mini App 功能集成。

## 功能特性

- ✅ 基础数学运算（加减乘除）
- ✅ 小数计算支持
- ✅ 键盘快捷键支持
- ✅ Telegram 主题适配
- ✅ 触觉反馈
- ✅ 结果分享功能
- ✅ 响应式设计
- ✅ 无障碍支持

## 部署步骤

### 1. 创建 Telegram Bot

1. 联系 [@BotFather](https://t.me/BotFather)
2. 发送 `/newbot` 创建新 bot
3. 设置 bot 名称和用户名
4. 保存 Bot Token

### 2. 设置 Mini App

1. 向 BotFather 发送 `/newapp`
2. 选择你的 bot
3. 设置应用信息：
   - **App name**: 计算器
   - **Description**: 简单易用的计算器工具
   - **Photo**: 上传计算器图标
   - **Demo GIF/Video**: 可选
4. 提供 Web App URL（你的部署地址）

### 3. 部署选项

#### 选项 A: GitHub Pages（免费）

1. 创建 GitHub 仓库
2. 上传所有文件到仓库
3. 在仓库设置中启用 GitHub Pages
4. 使用 `https://yourusername.github.io/repository-name` 作为 Web App URL

#### 选项 B: Vercel/Netlify（免费）

1. 连接 GitHub 仓库到 Vercel 或 Netlify
2. 部署项目
3. 使用生成的 URL 作为 Web App URL

#### 选项 C: 自建服务器

1. 上传文件到服务器
2. 配置 HTTPS（必须）
3. 使用域名作为 Web App URL

### 4. 配置 Bot 菜单

向 BotFather 发送以下命令设置菜单：

```
/setmenu

选择你的 bot，然后发送：

计算器 - calculator
```

### 5. 设置 Bot 命令

```
/setcommands

选择你的 bot，然后发送：

start - 启动计算器
calculator - 打开计算器
help - 帮助信息
```

## 文件结构

```
telegram-calculator/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── calculator.js   # 计算器逻辑
│   └── telegram.js     # Telegram API 集成
├── assets/             # 资源文件（图标等）
└── README.md          # 说明文档
```

## Bot 代码示例

创建一个简单的 Bot 来启动 Mini App：

```javascript
// bot.js
const { Telegraf } = require('telegraf');

const bot = new Telegraf('YOUR_BOT_TOKEN');

bot.start((ctx) => {
    ctx.reply('欢迎使用计算器！点击下方按钮打开计算器应用。', {
        reply_markup: {
            inline_keyboard: [[
                {
                    text: '🧮 打开计算器',
                    web_app: { url: 'https://your-domain.com' }
                }
            ]]
        }
    });
});

bot.command('calculator', (ctx) => {
    ctx.reply('点击下方按钮打开计算器：', {
        reply_markup: {
            inline_keyboard: [[
                {
                    text: '🧮 计算器',
                    web_app: { url: 'https://your-domain.com' }
                }
            ]]
        }
    });
});

bot.launch();
```

## 本地测试

1. 在项目目录中启动本地服务器：
   ```bash
   # Python 3
   python -m http.server 8000
   
   # 或使用 Node.js
   npx serve .
   ```

2. 使用 ngrok 创建 HTTPS 隧道：
   ```bash
   ngrok http 8000
   ```

3. 使用 ngrok 提供的 HTTPS URL 进行测试

## 注意事项

- Mini App 必须通过 HTTPS 访问
- 确保所有资源文件路径正确
- 测试不同设备和屏幕尺寸的兼容性
- 验证 Telegram 主题适配效果

## 浏览器兼容性

- Chrome/Chromium 88+
- Safari 14+
- Firefox 85+
- Telegram 内置浏览器

## 许可证

MIT License
