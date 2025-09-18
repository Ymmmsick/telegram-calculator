// Telegram Bot 配置文件
// 需要先安装 telegraf: npm install telegraf
// 8337126555:AAEOwoSKMpmEd7Fj3TxYLhv-wgJCadG0xoA
const { Telegraf } = require('telegraf');

// 替换为你的 Bot Token
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
// 替换为你的 Mini App URL
const WEB_APP_URL = 'https://your-domain.com';

const bot = new Telegraf(BOT_TOKEN);

// 启动命令
bot.start(async (ctx) => {
    try {
        const user = ctx.from;
        await ctx.reply(
            `👋 你好 ${user.first_name}！\n\n🧮 欢迎使用计算器 Mini App\n\n点击下方按钮开始使用：`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '🧮 打开计算器',
                                web_app: { url: WEB_APP_URL }
                            }
                        ],
                        [
                            {
                                text: '❓ 帮助',
                                callback_data: 'help'
                            }
                        ]
                    ]
                }
            }
        );
    } catch (error) {
        console.error('启动命令错误:', error);
    }
});

// 计算器命令
bot.command('calculator', async (ctx) => {
    try {
        await ctx.reply(
            '🧮 点击下方按钮打开计算器：',
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '🧮 计算器',
                                web_app: { url: WEB_APP_URL }
                            }
                        ]
                    ]
                }
            }
        );
    } catch (error) {
        console.error('计算器命令错误:', error);
    }
});

// 帮助命令
bot.command('help', async (ctx) => {
    const helpText = `
🧮 *计算器 Mini App 帮助*

*可用命令：*
/start - 启动计算器
/calculator - 直接打开计算器
/help - 显示帮助信息

*功能特性：*
• 基础数学运算（+、-、×、÷）
• 小数计算支持
• 键盘快捷键操作
• 结果分享功能
• 适配 Telegram 主题
• 触觉反馈体验

*使用说明：*
1. 点击数字和运算符按钮进行计算
2. 使用 AC 清除所有内容
3. 使用 ⌫ 删除最后输入的字符
4. 计算完成后可以分享结果到聊天
5. 支持键盘快捷键操作

如有问题请联系开发者 @your_username
    `;
    
    try {
        await ctx.replyWithMarkdown(helpText);
    } catch (error) {
        console.error('帮助命令错误:', error);
    }
});

// 处理内联键盘回调
bot.action('help', async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.editMessageText(
            `🧮 *计算器使用帮助*

*功能：*
• 基础四则运算
• 小数计算
• 键盘支持
• 结果分享

*操作：*
• 点击数字和运算符
• AC = 全部清除
• ⌫ = 删除一位
• = 计算结果

点击下方按钮开始使用：`,
            {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '🧮 打开计算器',
                                web_app: { url: WEB_APP_URL }
                            }
                        ],
                        [
                            {
                                text: '🔙 返回',
                                callback_data: 'back_to_start'
                            }
                        ]
                    ]
                }
            }
        );
    } catch (error) {
        console.error('帮助回调错误:', error);
    }
});

// 返回开始菜单
bot.action('back_to_start', async (ctx) => {
    try {
        await ctx.answerCbQuery();
        const user = ctx.from;
        await ctx.editMessageText(
            `👋 你好 ${user.first_name}！\n\n🧮 欢迎使用计算器 Mini App\n\n点击下方按钮开始使用：`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '🧮 打开计算器',
                                web_app: { url: WEB_APP_URL }
                            }
                        ],
                        [
                            {
                                text: '❓ 帮助',
                                callback_data: 'help'
                            }
                        ]
                    ]
                }
            }
        );
    } catch (error) {
        console.error('返回开始错误:', error);
    }
});

// 处理 Web App 数据
bot.on('web_app_data', async (ctx) => {
    try {
        const data = JSON.parse(ctx.webAppData.data);
        console.log('收到 Web App 数据:', data);
        
        if (data.action === 'share_result') {
            const result = data.result;
            const timestamp = new Date(data.timestamp).toLocaleString('zh-CN');
            
            await ctx.reply(
                `🧮 *计算结果*\n\n` +
                `📊 结果：\`${result}\`\n` +
                `🕒 时间：${timestamp}`,
                { parse_mode: 'Markdown' }
            );
        }
    } catch (error) {
        console.error('处理 Web App 数据错误:', error);
        await ctx.reply('❌ 数据处理出错，请重试');
    }
});

// 错误处理
bot.catch((err, ctx) => {
    console.error('Bot 错误:', err);
    console.error('上下文:', ctx);
});

// 启动 Bot
bot.launch({
    webhook: {
        // 如果使用 webhook，填写以下配置
        // domain: 'your-domain.com',
        // port: process.env.PORT || 3000
    }
}).then(() => {
    console.log('🤖 Bot 启动成功！');
    console.log('📱 Mini App URL:', WEB_APP_URL);
}).catch((error) => {
    console.error('❌ Bot 启动失败:', error);
});

// 优雅关闭
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = bot;