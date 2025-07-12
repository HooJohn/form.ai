# 🎓 SmartForm AI 2.0

SmartForm AI 是一款专为香港升学申请设计的智能表格填写平台。通过融合先进的 AI 技术（OCR、多模态LLM）与自动化流程，旨在解决家长和学生在填写复杂升学表格时面临的耗时、易错、效率低下等痛点。

## ✨ 核心功能

- **🤖 AI 表单分析**: 上传表格的图片或PDF，AI能自动识别其结构，并动态生成可交互的电子表单。
- **✍️ 自然语言填充**: 通过日常说话的方式提供信息，AI即可提取关键信息并填充到对应的表单字段中。
- **🧠 AI 升学报告**: 根据用户填写的表单内容，一键生成包含优势分析、待发展领域和面试贴士的个性化升学报告。
- **🗂️ 模板库与表单管理**: 提供丰富的学校表格模板，用户可以基于模板创建、保存和管理自己的申请表。
- **🔐 用户认证与管理**: 安全的注册、登录系统，以及用于管理个人资料的用户中心。
- **🚀 AI 优化闭环**: 系统能记录用户对AI结果的修正，为未来模型的持续优化提供数据基础（RLHF）。
- **🌐 多语言支持**: 界面支持繁体中文、简体中文和��文之间的无缝切换。

## 🛠️ 技术栈

本项目采用前后端分离的 Monorepo 架构。

-   **`src/common`**: 存放前后端共享的 TypeScript 类型定义，确保数据结构的一致性。

### 后端 (`src/backend`)

-   **框架**: Node.js, Express.js
-   **语言**: TypeScript
-   **AI / 机器学习**:
    -   **LLM**: Google Gemini Pro (通过 `@google/generative-ai` SDK)
    -   **OCR**: PaddleOCR (通过 Python 子进程调用)
-   **核心依赖**: `jsonwebtoken` (用户认证), `bcryptjs` (密码哈希), `multer` (文件上传)

### 前端 (`src/frontend`)

-   **框架**: React
-   **语言**: TypeScript
-   **UI**: Tailwind CSS
-   **路由**: React Router
-   **核心依赖**: `react-markdown` (报告展示), `lodash` (防抖)

## 🚀 快速开始

在开始之前，请确保您的开发环境中已安装以下软件：

-   [Node.js](https://nodejs.org/) (建议 v18 或更高版本)
-   [Python](https://www.python.org/) (建议 v3.9 或更高版本)
-   `npm` (通常随 Node.js 安装)
-   `pip` (通常随 Python 安装)

### 1. 克隆仓库

```bash
git clone <your-repository-url>
cd form.ai
```

### 2. 后端设置

首先，我们需要配置并运行后端服务器。

```bash
# 1. 进入后端目录
cd src/backend

# 2. 安装 Node.js 依赖
npm install

# 3. 设置环境变量
#    复制示例文件并根据您的配置进行修改
cp .env.example .env
```

**重要**: 打开新建的 `.env` 文件，并填入您的 Google Gemini API 密钥。

```dotenv
# .env
# ... 其他配置 ...
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

```bash
# 4. 设置 Python OCR 环境
#    建议使用虚拟环境
python3 -m venv .venv
source .venv/bin/activate  # 在 Windows 上使用: .venv\Scripts\activate

# 5. 安装 Python 依赖
pip install paddlepaddle paddleocr
```

### 3. 前端设置

现在，我们来配置前端应用。

```bash
# 1. (从项目根目录) 进入前端目录
cd src/frontend

# 2. 安装 Node.js 依赖
npm install
```

前端应用将自动从 `http://localhost:3001` 请求后端API，无需额外配置。

## ▶️ 运行应用

为了正常使用应用，您需要**同时运行**后端和前端开发服务器。

### 1. 运行后端服务器

打开一个终端窗口：

```bash
# 1. 进入后端目录
cd src/backend

# 2. (如果之前未激活) 激活 Python 虚拟环境
source .venv/bin/activate

# 3. 启动后端开发服务器
npm run dev
```

您应该会看到服务器在 `http://localhost:3001` 上成功运行的日志。

### 2. 运行前端服务器

打开**另一个**终端窗口：

```bash
# 1. 进入前��目录
cd src/frontend

# 2. 启动前端开发服务器
npm start
```

应用将自动在您的浏览器中打开，地址为 `http://localhost:3000`。

现在，您可以开始探索 SmartForm AI 的所有功能了！

## 🤝 贡献

我们欢迎各种形式的贡献！如果您有任何想法或发现了bug，请随时提交 Pull Request 或创建 Issue。

1.  Fork 本仓库
2.  创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3.  提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4.  推送到分支 (`git push origin feature/AmazingFeature`)
5.  打开一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详情请见 `LICENSE` 文件。
