# 🚀 Telegram Mini App 部署指南

## 第一步：创建 Telegram Bot

### 1.1 与 BotFather 对话
1. 打开 Telegram，搜索 `@BotFather`
2. 点击开始对话
3. 发送 `/start` 命令

### 1.2 创建新的 Bot
发送以下命令：
```
/newbot
```

BotFather 会要求你提供：
- **Bot 名称**（显示名称）：`计算器` 或 `Calculator`
- **Bot 用户名**（必须以bot结尾）：例如 `mycalculator_bot`

### 1.3 保存 Bot Token
BotFather 会给你一个类似这样的 Token：
```
1234567890:ABCDefGHIjklMNOPqrstUVWxyz
```

**⚠️ 重要：请妥善保管这个 Token，不要公开分享！**

---

## 第二步：部署前端到 GitHub Pages

### 2.1 创建 GitHub 仓库
1. 访问 [GitHub](https://github.com)，登录你的账号
2. 点击右上角 "+" → "New repository"
3. 设置仓库信息：
   - **Repository name**: `telegram-calculator`
   - **Description**: `Telegram 计算器 Mini App`
   - 勾选 ✅ **Public**
   - 勾选 ✅ **Add a README file**
4. 点击 "Create repository"

### 2.2 上传项目文件
有两种方式：

#### 方式A：通过 GitHub 网页上传
1. 在仓库页面点击 "Add file" → "Upload files"
2. 拖拽以下文件到页面：
   ```
   index.html
   css/style.css
   js/calculator.js  
   js/telegram.js
   ```
3. 输入提交信息：`初始上传计算器文件`
4. 点击 "Commit changes"

#### 方式B：通过 Git 命令（如果你熟悉命令行）
```bash
git clone https://github.com/你的用户名/telegram-calculator.git
cd telegram-calculator
# 复制项目文件到这个目录
git add .
git commit -m "初始上传计算器文件"
git push
```

### 2.3 启用 GitHub Pages
1. 在仓库页面点击 "Settings" 标签
2. 滚动到左侧菜单的 "Pages" 选项
3. 在 "Source" 下拉菜单选择 "Deploy from a branch"
4. 在 "Branch" 选择 "main"，文件夹选择 "/ (root)"
5. 点击 "Save"

### 2.4 获取你的网站地址
GitHub 会给你一个类似这样的地址：
```
https://你的用户名.github.io/telegram-calculator/
```

**📝 记下这个地址，稍后需要用到！**

---

## 第三步：配置 Mini App

### 3.1 向 BotFather 注册 Mini App
回到与 `@BotFather` 的对话，发送：
```
/newapp
```

### 3.2 选择你的 Bot
BotFather 会显示你的 Bot 列表，点击刚创建的计算器 Bot

### 3.3 填写应用信息
按照提示依次提供：

**App name（应用名称）**：
```
计算器
```

**Description（应用描述）**：
```
简单易用的计算器工具，支持基础数学运算
```

**Photo（应用图标）**：
- 上传一张 512x512 像素的计算器图标
- 或者暂时跳过，稍后可以添加

**Demo GIF/Video（演示视频）**：
- 可选项，暂时跳过

**Web App URL（重要！）**：
```
https://你的用户名.github.io/telegram-calculator/
```

### 3.4 完成注册
BotFather 会确认你的 Mini App 已创建成功！

---

## 第四步：设置 Bot 命令和菜单

### 4.1 设置 Bot 命令
向 BotFather 发送：
```
/setcommands
```

选择你的 Bot，然后发送：
```
start - 启动计算器
calculator - 打开计算器  
help - 帮助信息
```

### 4.2 设置菜单按钮
向 BotFather 发送：
```
/setmenu
```

选择你的 Bot，然后发送：
```
计算器 - calculator
```

### 4.3 设置 Bot 描述（可选）
```
/setdescription
```
输入：
```
这是一个简单易用的计算器 Mini App，支持基础数学运算。点击菜单按钮即可开始使用！
```

---

## 第五步：本地测试 Bot（可选）

如果你想运行 Bot 服务器：

### 5.1 安装 Node.js
1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载并安装最新稳定版

### 5.2 配置 Bot
1. 编辑 `bot.js` 文件
2. 替换以下内容：
   ```javascript
   const BOT_TOKEN = '你的Bot Token';
   const WEB_APP_URL = 'https://你的用户名.github.io/telegram-calculator/';
   ```

### 5.3 安装依赖并运行
```bash
cd telegram-calculator
npm install
npm start
```

---

## 第六步：测试你的 Mini App

### 6.1 测试基础功能
1. 在 Telegram 中搜索你的 Bot：`@你的bot用户名`
2. 发送 `/start` 命令
3. 点击 "🧮 打开计算器" 按钮
4. 测试计算功能是否正常

### 6.2 测试分享功能
1. 进行一次计算
2. 点击下方的 "分享结果" 按钮
3. 检查结果是否正确发送到聊天

### 6.3 测试菜单
1. 点击 Bot 聊天界面的菜单按钮（三条横线图标）
2. 选择 "计算器" 选项
3. 确认能正常打开应用

---

## ❓ 常见问题解决

### Q1: 点击按钮没有反应
- 检查 GitHub Pages 地址是否正确
- 确认文件已正确上传到仓库
- 等待 5-10 分钟让 GitHub Pages 完全部署

### Q2: 计算器界面显示异常
- 检查 `css/style.css` 文件是否正确上传
- 确认文件路径大小写正确

### Q3: 分享功能不工作
- 确认你没有运行本地 Bot 服务器
- Mini App 的分享功能在没有 Bot 服务器时会显示"已复制"

### Q4: Bot 没有响应
- 检查 Bot Token 是否正确
- 确认 Bot 没有被其他程序占用

---

## 📱 完成！

恭喜！你的 Telegram 计算器 Mini App 现在应该可以正常工作了。

**测试清单：**
- [ ] Bot 响应 `/start` 命令
- [ ] 能打开计算器界面  
- [ ] 计算功能正常
- [ ] 界面适配 Telegram 主题
- [ ] 菜单按钮工作正常

需要我帮你解决任何问题吗？