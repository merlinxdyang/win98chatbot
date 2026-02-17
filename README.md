# Windows 98 AI Chatbot | Windows 98 风格 AI 聊天机器人

<div align="center">

![Windows 98 Style](https://img.shields.io/badge/Windows_98-Style-008080?style=flat&logo=windows95)
![License](https://img.shields.io/badge/License-MIT-blue)
![Pure Frontend](https://img.shields.io/badge/Frontend-Pure_HTML%2FCSS%2FJS-brightgreen)

A nostalgic Windows 98-styled AI chatbot with multi-model support and vision capabilities.

一个复古的 Windows 98 风格 AI 聊天机器人，支持多个 AI 模型和图片理解功能。

[English](#english) | [中文](#chinese)

</div>

---

<a name="english"></a>

## 🖥️ Features

- **🎨 Authentic Win98 Experience** - Classic desktop, windows, taskbar, and iconic wallpapers (including Windows XP Bliss)
- **🤖 12 AI Models** - Support for GPT, Claude, Gemini, DeepSeek, Kimi, and Grok models
- **👁️ Vision Capabilities** - Upload or paste images for multimodal conversations (7 models support vision)
- **💾 Export Chats** - Export conversations to Markdown with embedded images
- **🎯 Window Management** - Draggable, minimizable, maximizable, and resizable windows
- **🖼️ Custom Wallpapers** - Upload your own desktop backgrounds
- **📱 Responsive Design** - Works on desktop browsers
- **🔒 Privacy First** - All data stored locally in browser, API key never leaves your device
- **⚡ Streaming Responses** - Real-time AI response display
- **🎨 Pixel-Perfect Icons** - Authentic Windows 98 desktop icons with transparency

## 🚀 Quick Start

### 1. Open the App

Simply open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari).

### 2. Configure API

1. Click **File → Settings** in the menu bar
2. Enter your **OpenRouter API Key** ([Get one here](https://openrouter.ai/))
3. Select an **AI model** from the dropdown
4. Adjust **font size** if needed (Small/Medium/Large)
5. Click **Save**

### 3. Start Chatting

- Type your message in the input box
- Press **Enter** to send, **Shift+Enter** for new line
- For vision-enabled models:
  - Click 📎 button to upload images
  - Use **Ctrl+V** (Windows) or **Cmd+V** (Mac) to paste images

### 4. Desktop Features

- **Double-click icons** to launch features
- **Right-click desktop** to change wallpaper
- **Drag icons** to reposition them
- **Drag windows** by title bar
- **Resize windows** by dragging corners
- Click **Start** button for system menu

## 📋 Supported Models

### Vision-Enabled Models (7) 👁️

| Model | Provider | Input Cost | Output Cost | Context |
|-------|----------|-----------|-------------|---------|
| GPT 5.2 | OpenAI | $1.75/M | $14/M | 400K |
| GPT 5 mini | OpenAI | $0.25/M | $2/M | 400K |
| GPT 5 nano | OpenAI | $0.05/M | $0.40/M | 400K |
| GPT 4o-mini | OpenAI | $0.15/M | $0.60/M | 128K |
| Claude Sonnet 4.5 | Anthropic | $3/M | $15/M | 1000K |
| Gemini 3 Flash Preview | Google | $0.10/M | $0.40/M | 1048K |
| Gemini 2.5 Flash | Google | $0.10/M | $0.40/M | 1048K |

### Text-Only Models (5) 📝

| Model | Provider | Input Cost | Output Cost | Context |
|-------|----------|-----------|-------------|---------|
| DeepSeek V3.2 | DeepSeek | $0.27/M | $0.38/M | 128K |
| DeepSeek R1 | DeepSeek | $0.55/M | $2.19/M | 128K |
| Kimi K2.5 | MoonshotAI | $0.50/M | $2.80/M | 262K |
| Kimi K2 Thinking | MoonshotAI | $0.40/M | $1.75/M | 262K |
| Grok 4.1 Fast | xAI | $0.20/M | $0.50/M | 2000K |

## ⌨️ Keyboard Shortcuts

- **Enter** - Send message
- **Shift+Enter** - New line
- **Ctrl/Cmd+V** - Paste image (vision models only)
- **Esc** - Close dialogs/menus

## 📁 Project Structure

```
win98chatbot/
├── index.html          # Main HTML page (354 lines)
├── styles.css          # Win98 styling (802 lines)
├── app.js              # Application logic (1150 lines)
├── bliss.jpg           # Windows XP Bliss wallpaper
├── icons/              # Desktop icons (PNG + SVG)
│   ├── my_computer.png
│   ├── my_documents.png
│   ├── internet_explorer.png
│   ├── network.png
│   ├── recycle_bin.png
│   └── outlook_express.png
└── README.md           # This file
```

## 🛠️ Technical Details

- **Pure Frontend** - No server required, runs entirely in the browser
- **API Integration** - Uses OpenRouter API for AI model access
- **Local Storage** - All settings and chat history stored locally
- **Image Processing** - Images converted to Base64 for API transmission
- **Streaming** - Server-Sent Events (SSE) for real-time responses
- **No Dependencies** - Vanilla HTML, CSS, and JavaScript

## 📝 Notes

- Maximum image size: 5MB
- Supported image formats: JPG, PNG, GIF, WebP
- Chat history stored in browser local storage
- Clearing browser data will delete chat history (export regularly!)
- API costs are charged by OpenRouter based on selected model

## 📄 License

MIT License - Feel free to use and modify!

## 🙏 Credits

- Windows 98 design © Microsoft Corporation
- Windows XP Bliss wallpaper © Charles O'Rear
- AI models provided via [OpenRouter](https://openrouter.ai/)

---

<a name="chinese"></a>

## 🖥️ 功能特性

- **🎨 原汁原味的 Win98 体验** - 经典桌面、窗口、任务栏和标志性壁纸（包括 Windows XP Bliss）
- **🤖 12 个 AI 模型** - 支持 GPT、Claude、Gemini、DeepSeek、Kimi 和 Grok 模型
- **👁️ 视觉理解能力** - 上传或粘贴图片进行多模态对话（7 个模型支持视觉）
- **💾 聊天记录导出** - 导出对话为 Markdown 格式，包含嵌入图片
- **🎯 窗口管理** - 可拖动、最小化、最大化和调整大小的窗口
- **🖼️ 自定义壁纸** - 上传你自己的桌面背景
- **📱 响应式设计** - 适配桌面浏览器
- **🔒 隐私优先** - 所有数据存储在本地浏览器，API 密钥永不离开设备
- **⚡ 流式响应** - 实时显示 AI 回复
- **🎨 像素级完美图标** - 真实的 Windows 98 桌面图标，带透明背景

## 🚀 快速开始

### 1. 打开应用

在现代网页浏览器中直接打开 `index.html` 文件即可（Chrome、Firefox、Edge、Safari）。

### 2. 配置 API

1. 点击菜单栏的 **文件 → 设置**
2. 输入你的 **OpenRouter API Key**（[点此获取](https://openrouter.ai/)）
3. 从下拉列表中选择一个 **AI 模型**
4. 根据需要调整**字体大小**（小/中/大）
5. 点击**保存**

### 3. 开始聊天

- 在输入框中输入消息
- 按 **Enter** 发送，**Shift+Enter** 换行
- 对于支持视觉的模型：
  - 点击 📎 按钮上传图片
  - 使用 **Ctrl+V**（Windows）或 **Cmd+V**（Mac）粘贴图片

### 4. 桌面功能

- **双击图标**启动功能
- **右键点击桌面**更换壁纸
- **拖动图标**重新定位
- **拖动窗口**标题栏移动窗口
- **拖动角落**调整窗口大小
- 点击**开始**按钮打开系统菜单

## 📋 支持的模型

### 支持视觉的模型 (7个) 👁️

| 模型 | 提供商 | 输入成本 | 输出成本 | 上下文 |
|------|--------|---------|---------|--------|
| GPT 5.2 | OpenAI | $1.75/M | $14/M | 400K |
| GPT 5 mini | OpenAI | $0.25/M | $2/M | 400K |
| GPT 5 nano | OpenAI | $0.05/M | $0.40/M | 400K |
| GPT 4o-mini | OpenAI | $0.15/M | $0.60/M | 128K |
| Claude Sonnet 4.5 | Anthropic | $3/M | $15/M | 1000K |
| Gemini 3 Flash Preview | Google | $0.10/M | $0.40/M | 1048K |
| Gemini 2.5 Flash | Google | $0.10/M | $0.40/M | 1048K |

### 纯文本模型 (5个) 📝

| 模型 | 提供商 | 输入成本 | 输出成本 | 上下文 |
|------|--------|---------|---------|--------|
| DeepSeek V3.2 | DeepSeek | $0.27/M | $0.38/M | 128K |
| DeepSeek R1 | DeepSeek | $0.55/M | $2.19/M | 128K |
| Kimi K2.5 | MoonshotAI | $0.50/M | $2.80/M | 262K |
| Kimi K2 Thinking | MoonshotAI | $0.40/M | $1.75/M | 262K |
| Grok 4.1 Fast | xAI | $0.20/M | $0.50/M | 2000K |

## ⌨️ 快捷键

- **Enter** - 发送消息
- **Shift+Enter** - 换行
- **Ctrl/Cmd+V** - 粘贴图片（仅限视觉模型）
- **Esc** - 关闭对话框/菜单

## 📁 项目结构

```
win98chatbot/
├── index.html          # 主 HTML 页面（354 行）
├── styles.css          # Win98 样式（802 行）
├── app.js              # 应用逻辑（1150 行）
├── bliss.jpg           # Windows XP Bliss 壁纸
├── icons/              # 桌面图标（PNG + SVG）
│   ├── my_computer.png
│   ├── my_documents.png
│   ├── internet_explorer.png
│   ├── network.png
│   ├── recycle_bin.png
│   └── outlook_express.png
└── README.md           # 本文件
```

## 🛠️ 技术细节

- **纯前端** - 无需服务器，完全在浏览器中运行
- **API 集成** - 使用 OpenRouter API 访问 AI 模型
- **本地存储** - 所有设置和聊天记录存储在本地
- **图片处理** - 图片转换为 Base64 用于 API 传输
- **流式传输** - 使用服务器推送事件（SSE）实现实时响应
- **无依赖** - 原生 HTML、CSS 和 JavaScript

## 📝 注意事项

- 图片大小限制：5MB
- 支持的图片格式：JPG、PNG、GIF、WebP
- 聊天记录保存在浏览器本地存储中
- 清除浏览器数据会丢失聊天记录（建议定期导出！）
- API 费用由 OpenRouter 根据所选模型收取

## 📄 许可证

MIT License - 随意使用和修改！

## 🙏 致谢

- Windows 98 设计 © Microsoft Corporation
- Windows XP Bliss 壁纸 © Charles O'Rear
- AI 模型由 [OpenRouter](https://openrouter.ai/) 提供

---

<div align="center">

**Enjoy your retro AI chat experience! 享受你的复古 AI 聊天体验！** 🎉

Made with ❤️ and nostalgia for the golden age of computing

</div>
