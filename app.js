// Windows 98 AI Chatbot - Main Application (Enhanced)

// ========== Configuration ==========
const CONFIG = {
    API_URL: 'https://openrouter.ai/api/v1/chat/completions',
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_WALLPAPER_SIZE: 8 * 1024 * 1024, // 8MB
    DEFAULT_WALLPAPER: 'bliss.jpg',
    STORAGE_KEYS: {
        API_KEY: 'win98_api_key',
        MODEL: 'win98_selected_model',
        CHAT_HISTORY: 'win98_chat_history',
        DESKTOP_BG: 'win98_desktop_background'
    }
};

// Model configuration with vision support
const MODELS = {
    'openai/gpt-5.2': { name: 'GPT 5.2', vision: true, inputCost: 1.75, outputCost: 14, context: '400K' },
    'openai/gpt-4o-mini': { name: 'GPT 4o-mini', vision: true, inputCost: 0.15, outputCost: 0.60, context: '128K' },
    'openai/gpt-5-mini': { name: 'GPT 5 mini', vision: true, inputCost: 0.25, outputCost: 2, context: '400K' },
    'openai/gpt-5-nano': { name: 'GPT 5 nano', vision: true, inputCost: 0.05, outputCost: 0.40, context: '400K' },
    'anthropic/claude-4.5-sonnet': { name: 'Claude Sonnet 4.5', vision: true, inputCost: 3, outputCost: 15, context: '1000K' },
    'deepseek/deepseek-v3.2': { name: 'DeepSeek V3.2', vision: false, inputCost: 0.27, outputCost: 0.38, context: '128K' },
    'deepseek/deepseek-r1': { name: 'DeepSeek R1', vision: false, inputCost: 0.55, outputCost: 2.19, context: '128K' },
    'google/gemini-3-flash-preview': { name: 'Gemini 3 Flash Preview', vision: true, inputCost: 0.10, outputCost: 0.40, context: '1048K' },
    'google/gemini-2.5-flash': { name: 'Gemini 2.5 Flash', vision: true, inputCost: 0.10, outputCost: 0.40, context: '1048K' },
    'moonshotai/kimi-k2.5': { name: 'Kimi K2.5', vision: false, inputCost: 0.50, outputCost: 2.80, context: '262K' },
    'moonshotai/kimi-k2-thinking': { name: 'Kimi K2 Thinking', vision: false, inputCost: 0.40, outputCost: 1.75, context: '262K' },
    'x-ai/grok-4.1-fast': { name: 'Grok 4.1 Fast', vision: false, inputCost: 0.20, outputCost: 0.50, context: '2000K' }
};

// ========== State Management ==========
const state = {
    apiKey: '',
    selectedModel: '',
    chatHistory: [],
    currentImage: null,
    isStreaming: false,
    chatWindowState: {
        isMaximized: false,
        isMinimized: false,
        originalPosition: null
    }
};

// ========== DOM Elements ==========
const elements = {
    // Desktop
    desktop: document.getElementById('desktop'),
    myComputer: document.getElementById('myComputer'),
    myDocuments: document.getElementById('myDocuments'),
    ieIcon: document.getElementById('ieIcon'),
    recycleBin: document.getElementById('recycleBin'),
    network: document.getElementById('network'),
    outlookIcon: document.getElementById('outlookIcon'),

    // Start Menu
    startButton: document.getElementById('startButton'),
    startMenu: document.getElementById('startMenu'),
    changeWallpaperItem: document.getElementById('changeWallpaperItem'),
    resetWallpaperItem: document.getElementById('resetWallpaperItem'),
    restartItem: document.getElementById('restartItem'),
    shutdownItem: document.getElementById('shutdownItem'),
    wallpaperInput: document.getElementById('wallpaperInput'),

    // Window controls
    chatWindow: document.getElementById('chatWindow'),
    minimizeBtn: document.getElementById('minimizeBtn'),
    maximizeBtn: document.getElementById('maximizeBtn'),
    closeBtn: document.getElementById('closeBtn'),
    chatTaskbarBtn: document.getElementById('chatTaskbarBtn'),

    // Menu
    fileMenu: document.getElementById('fileMenu'),
    helpMenu: document.getElementById('helpMenu'),
    fileDropdown: document.getElementById('fileDropdown'),
    helpDropdown: document.getElementById('helpDropdown'),
    settingsMenu: document.getElementById('settingsMenu'),
    exportMenu: document.getElementById('exportMenu'),
    clearMenu: document.getElementById('clearMenu'),
    exitMenu: document.getElementById('exitMenu'),
    aboutMenu: document.getElementById('aboutMenu'),

    // Chat
    messages: document.getElementById('messages'),
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    modelInfo: document.getElementById('modelInfo'),
    currentModel: document.getElementById('currentModel'),
    modelCost: document.getElementById('modelCost'),

    // Image handling
    uploadImageBtn: document.getElementById('uploadImageBtn'),
    imageInput: document.getElementById('imageInput'),
    imagePreviewArea: document.getElementById('imagePreviewArea'),
    imagePreviewContainer: document.getElementById('imagePreviewContainer'),
    imageViewer: document.getElementById('imageViewer'),
    viewerImage: document.getElementById('viewerImage'),
    closeImageViewerBtn: document.getElementById('closeImageViewerBtn'),

    // Settings dialog
    settingsDialog: document.getElementById('settingsDialog'),
    apiKeyInput: document.getElementById('apiKeyInput'),
    modelSelect: document.getElementById('modelSelect'),
    fontSizeSelect: document.getElementById('fontSizeSelect'),
    modelInfoText: document.getElementById('modelInfoText'),
    saveSettingsBtn: document.getElementById('saveSettingsBtn'),
    cancelSettingsBtn: document.getElementById('cancelSettingsBtn'),
    closeSettingsBtn: document.getElementById('closeSettingsBtn'),

    // About dialog
    aboutDialog: document.getElementById('aboutDialog'),
    closeAboutBtn: document.getElementById('closeAboutBtn'),
    closeAboutOkBtn: document.getElementById('closeAboutOkBtn'),

    // My Computer
    myComputerWindow: document.getElementById('myComputerWindow'),

    // Context Menu
    contextMenu: document.getElementById('contextMenu'),
    propertiesItem: document.getElementById('propertiesItem'),

    // Properties Dialog
    propertiesDialog: document.getElementById('propertiesDialog'),
    closePropertiesBtn: document.getElementById('closePropertiesBtn'),
    closePropertiesOkBtn: document.getElementById('closePropertiesOkBtn'),

    // Clock
    clock: document.getElementById('clock')
};

// ========== Initialization ==========
function init() {
    loadSettings();
    setupEventListeners();
    setupDesktopIcons();
    updateClock();
    setInterval(updateClock, 1000);
    makeDraggable(elements.chatWindow);
    makeDraggable(elements.myComputerWindow);
    makeResizable(elements.chatWindow);
    applyFontSize(loadFontSize());
}

function loadSettings() {
    state.apiKey = localStorage.getItem(CONFIG.STORAGE_KEYS.API_KEY) || '';
    state.selectedModel = localStorage.getItem(CONFIG.STORAGE_KEYS.MODEL) || '';
    applyDesktopBackground(localStorage.getItem(CONFIG.STORAGE_KEYS.DESKTOP_BG) || CONFIG.DEFAULT_WALLPAPER);

    try {
        const savedHistory = localStorage.getItem(CONFIG.STORAGE_KEYS.CHAT_HISTORY);
        if (savedHistory) {
            state.chatHistory = JSON.parse(savedHistory);
            renderChatHistory();
        }
    } catch (e) {
        console.error('Failed to load chat history:', e);
    }

    updateModelInfo();
    updateImageUploadButton();
}

function saveSettings() {
    if (state.apiKey) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.API_KEY, state.apiKey);
    }
    if (state.selectedModel) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.MODEL, state.selectedModel);
    }
}

function saveChatHistory() {
    try {
        localStorage.setItem(CONFIG.STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(state.chatHistory));
    } catch (e) {
        console.error('Failed to save chat history:', e);
    }
}

// ========== Event Listeners ==========
function setupEventListeners() {
    // Start Menu
    elements.startButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleStartMenu();
    });
    elements.changeWallpaperItem.addEventListener('click', openWallpaperPicker);
    elements.resetWallpaperItem.addEventListener('click', resetDesktopBackground);
    elements.restartItem.addEventListener('click', restartSystem);
    elements.shutdownItem.addEventListener('click', shutdownSystem);
    elements.wallpaperInput.addEventListener('change', handleWallpaperSelect);

    // Window controls
    elements.minimizeBtn.addEventListener('click', minimizeWindow);
    elements.maximizeBtn.addEventListener('click', toggleMaximize);
    elements.closeBtn.addEventListener('click', closeChatWindow);
    elements.chatTaskbarBtn.addEventListener('click', restoreWindow);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.chatWindowState.isMaximized) {
            toggleMaximize();
        }
    });

    // Menu
    elements.fileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu(elements.fileMenu);
    });
    elements.helpMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu(elements.helpMenu);
    });

    elements.settingsMenu.addEventListener('click', openSettings);
    elements.exportMenu.addEventListener('click', exportChat);
    elements.clearMenu.addEventListener('click', clearHistory);
    elements.exitMenu.addEventListener('click', closeChatWindow);
    elements.aboutMenu.addEventListener('click', openAbout);

    // Close menus and start menu when clicking outside
    document.addEventListener('click', () => {
        closeAllMenus();
        closeStartMenu();
        closeContextMenu();
    });

    // Chat input
    elements.sendBtn.addEventListener('click', sendMessage);
    elements.messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Image upload
    elements.uploadImageBtn.addEventListener('click', () => elements.imageInput.click());
    elements.imageInput.addEventListener('change', handleImageSelect);

    // Image viewer
    elements.closeImageViewerBtn.addEventListener('click', () => {
        elements.imageViewer.style.display = 'none';
    });

    // Paste event for images
    document.addEventListener('paste', handlePaste);

    // Settings dialog
    elements.saveSettingsBtn.addEventListener('click', saveSettingsDialog);
    elements.cancelSettingsBtn.addEventListener('click', closeSettings);
    elements.closeSettingsBtn.addEventListener('click', closeSettings);
    elements.modelSelect.addEventListener('change', updateModelInfoInDialog);

    // About dialog
    elements.closeAboutBtn.addEventListener('click', closeAbout);
    elements.closeAboutOkBtn.addEventListener('click', closeAbout);

    // Properties dialog
    elements.closePropertiesBtn.addEventListener('click', closeProperties);
    elements.closePropertiesOkBtn.addEventListener('click', closeProperties);
    elements.propertiesItem.addEventListener('click', openProperties);
}

// ========== Desktop Icons ==========
function setupDesktopIcons() {
    const icons = [
        elements.myComputer,
        elements.myDocuments,
        elements.ieIcon,
        elements.network,
        elements.recycleBin,
        elements.outlookIcon
    ];

    icons.forEach(icon => {
        // Double click to open
        icon.addEventListener('dblclick', () => {
            handleDesktopIconDoubleClick(icon.id);
        });

        // Right click for context menu
        icon.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (icon.id === 'myComputer') {
                showContextMenu(e, icon);
            }
        });

        // Make draggable
        makeIconDraggable(icon);

        // Selection
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            selectIcon(icon);
        });
    });

    // Deselect on desktop click
    elements.desktop.addEventListener('click', deselectAllIcons);
}

function handleDesktopIconDoubleClick(iconId) {
    switch (iconId) {
        case 'myComputer':
            openMyComputer();
            break;
        case 'myDocuments':
            openMyDocuments();
            break;
        case 'ieIcon':
            openInternetExplorer();
            break;
        case 'network':
            openNetworkNeighborhood();
            break;
        case 'recycleBin':
            openRecycleBin();
            break;
        case 'outlookIcon':
            openOutlookExpress();
            break;
        default:
            break;
    }
}

function openWallpaperPicker() {
    closeStartMenu();
    elements.wallpaperInput.click();
}

function handleWallpaperSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('请选择图片文件。');
        return;
    }

    if (file.size > CONFIG.MAX_WALLPAPER_SIZE) {
        alert(`壁纸文件不能超过 ${CONFIG.MAX_WALLPAPER_SIZE / 1024 / 1024}MB`);
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const wallpaperData = e.target.result;
        applyDesktopBackground(wallpaperData);
        localStorage.setItem(CONFIG.STORAGE_KEYS.DESKTOP_BG, wallpaperData);
    };
    reader.readAsDataURL(file);
    elements.wallpaperInput.value = '';
}

function resetDesktopBackground() {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.DESKTOP_BG);
    applyDesktopBackground(CONFIG.DEFAULT_WALLPAPER);
    closeStartMenu();
}

function applyDesktopBackground(backgroundSource) {
    elements.desktop.style.backgroundImage = `url("${backgroundSource}")`;
    elements.desktop.style.backgroundPosition = 'center center';
    elements.desktop.style.backgroundRepeat = 'no-repeat';
    elements.desktop.style.backgroundSize = 'cover';
}

function makeIconDraggable(icon) {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    icon.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Only left click
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = icon.offsetLeft;
        initialTop = icon.offsetTop;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        icon.style.left = (initialLeft + dx) + 'px';
        icon.style.top = (initialTop + dy) + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

function selectIcon(icon) {
    deselectAllIcons();
    icon.classList.add('selected');
}

function deselectAllIcons() {
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.classList.remove('selected');
    });
}

// ========== Start Menu ==========
function toggleStartMenu() {
    const isVisible = elements.startMenu.style.display === 'block';
    elements.startMenu.style.display = isVisible ? 'none' : 'block';
}

function closeStartMenu() {
    elements.startMenu.style.display = 'none';
}

function restartSystem() {
    const confirmed = confirm('确定要重新启动计算机吗？');
    if (confirmed) {
        location.reload();
    }
}

function shutdownSystem() {
    const confirmed = confirm('确定要关闭计算机吗？');
    if (confirmed) {
        elements.chatWindow.style.display = 'none';
        elements.chatTaskbarBtn.style.display = 'none';
        addSystemMessage('系统已关闭。刷新页面以重新启动。');
    }
}

// ========== Window Management ==========
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const titleBar = element.querySelector('.title-bar');

    if (!titleBar) return;

    titleBar.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (state.chatWindowState.isMaximized && element.id === 'chatWindow') return;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + 'px';
        element.style.left = (element.offsetLeft - pos1) + 'px';
        element.style.transform = 'none';
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function minimizeWindow() {
    if (elements.chatWindow.style.display === 'none') return;
    elements.chatWindow.style.display = 'none';
    elements.chatTaskbarBtn.classList.remove('active');
    state.chatWindowState.isMinimized = true;
}

function restoreWindow() {
    if (state.chatWindowState.isMinimized) {
        elements.chatWindow.style.display = 'flex';
        elements.chatTaskbarBtn.classList.add('active');
        state.chatWindowState.isMinimized = false;
    }
}

function launchChatbot() {
    elements.chatTaskbarBtn.style.display = 'block';
    elements.chatWindow.style.display = 'flex';
    elements.chatTaskbarBtn.classList.add('active');
    state.chatWindowState.isMinimized = false;
}

function toggleMaximize() {
    if (state.chatWindowState.isMaximized) {
        // Restore
        elements.chatWindow.classList.remove('fullscreen');
        if (state.chatWindowState.originalPosition) {
            elements.chatWindow.style.width = state.chatWindowState.originalPosition.width;
            elements.chatWindow.style.height = state.chatWindowState.originalPosition.height;
            elements.chatWindow.style.top = state.chatWindowState.originalPosition.top;
            elements.chatWindow.style.left = state.chatWindowState.originalPosition.left;
        }
        state.chatWindowState.isMaximized = false;
    } else {
        // Maximize
        state.chatWindowState.originalPosition = {
            width: elements.chatWindow.style.width || '600px',
            height: elements.chatWindow.style.height || '500px',
            top: elements.chatWindow.style.top,
            left: elements.chatWindow.style.left
        };
        elements.chatWindow.classList.add('fullscreen');
        state.chatWindowState.isMaximized = true;
    }
}

function closeChatWindow() {
    const confirmed = confirm('确定要退出 AI Chatbot 吗？');
    if (confirmed) {
        elements.chatWindow.style.display = 'none';
        elements.chatTaskbarBtn.style.display = 'none';
        elements.chatTaskbarBtn.classList.remove('active');
        state.chatWindowState.isMinimized = false;
    }
}

// ========== My Computer ==========
function openMyComputer() {
    openExternalTargets(['x-apple.systempreferences:']);
}

function openMyDocuments() {
    const docsUrl = buildDocumentsFolderUrl();
    if (!docsUrl) {
        alert('无法定位文稿文件夹路径。请从 Finder 手动打开“文稿”。');
        return;
    }
    openExternalTargets([docsUrl]);
}

function openInternetExplorer() {
    launchChatbot();
}

function openNetworkNeighborhood() {
    openExternalTargets([
        'x-apple.systempreferences:com.apple.preference.network',
        'x-apple.systempreferences:com.apple.NetworkSettings-Settings.extension',
        'x-apple.systempreferences:'
    ]);
}

function openOutlookExpress() {
    openExternalTargets(['mailto:']);
}

function openRecycleBin() {
    const trashUrl = buildUserFolderUrl('.Trash');
    if (!trashUrl) {
        alert('无法定位废纸篓路径。请从 Finder 手动打开“废纸篓”。');
        return;
    }
    openExternalTargets([trashUrl]);
}

function buildDocumentsFolderUrl() {
    return buildUserFolderUrl('Documents');
}

function buildUserFolderUrl(folderName) {
    const decodedPath = decodeURIComponent(window.location.pathname || '');
    const matched = decodedPath.match(/\/Users\/([^/]+)/);
    if (!matched) return null;
    const username = matched[1];
    return `file:///Users/${encodeURIComponent(username)}/${encodeURIComponent(folderName)}`;
}

function openExternalTargets(urls) {
    for (const url of urls) {
        try {
            const popup = window.open(url, '_blank');
            if (popup) return;
        } catch (error) {
            // Continue to next candidate URL
        }
    }

    if (urls.length > 0) {
        try {
            window.location.href = urls[0];
        } catch (error) {
            alert('无法打开目标应用。');
        }
    }
}

function closeMyComputer() {
    elements.myComputerWindow.style.display = 'none';
}

function minimizeMyComputer() {
    elements.myComputerWindow.style.display = 'none';
}

function maximizeMyComputer() {
    alert('最大化功能暂未实现');
}

// ========== Context Menu ==========
function showContextMenu(e, icon) {
    elements.contextMenu.style.display = 'block';
    elements.contextMenu.style.left = e.clientX + 'px';
    elements.contextMenu.style.top = e.clientY + 'px';
    elements.contextMenu.dataset.iconId = icon.id;
}

function closeContextMenu() {
    elements.contextMenu.style.display = 'none';
}

function openProperties() {
    elements.propertiesDialog.style.display = 'flex';
    closeContextMenu();
}

function closeProperties() {
    elements.propertiesDialog.style.display = 'none';
}

// ========== Menu Management ==========
function toggleMenu(menuElement) {
    const wasActive = menuElement.classList.contains('active');
    closeAllMenus();
    if (!wasActive) {
        menuElement.classList.add('active');
    }
}

function closeAllMenus() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
}

// ========== Dialog Management ==========
function openSettings() {
    elements.apiKeyInput.value = state.apiKey;
    elements.modelSelect.value = state.selectedModel;
    elements.fontSizeSelect.value = localStorage.getItem('win98_font_size') || 'medium';
    updateModelInfoInDialog();
    elements.settingsDialog.style.display = 'flex';
    closeAllMenus();
}

function closeSettings() {
    elements.settingsDialog.style.display = 'none';
}

function saveSettingsDialog() {
    state.apiKey = elements.apiKeyInput.value.trim();
    state.selectedModel = elements.modelSelect.value;
    const fontSize = elements.fontSizeSelect.value;

    if (!state.apiKey) {
        alert('请输入 API Key！');
        return;
    }

    if (!state.selectedModel) {
        alert('请选择模型！');
        return;
    }

    saveSettings();
    saveFontSize(fontSize);
    applyFontSize(fontSize);
    updateModelInfo();
    updateImageUploadButton();
    closeSettings();

    addSystemMessage('设置已保存！');
}

function updateModelInfoInDialog() {
    const selectedModel = elements.modelSelect.value;
    if (selectedModel && MODELS[selectedModel]) {
        const model = MODELS[selectedModel];
        elements.modelInfoText.innerHTML = `
            <strong>${model.name}</strong><br>
            输入: $${model.inputCost}/M tokens<br>
            输出: $${model.outputCost}/M tokens<br>
            上下文: ${model.context}<br>
            ${model.vision ? '✓ 支持图片理解' : '✗ 不支持图片'}
        `;
    } else {
        elements.modelInfoText.textContent = '选择模型后将显示详细费用信息';
    }
}

function openAbout() {
    elements.aboutDialog.style.display = 'flex';
    closeAllMenus();
}

function closeAbout() {
    elements.aboutDialog.style.display = 'none';
}

// ========== Model Info ==========
function updateModelInfo() {
    if (state.selectedModel && MODELS[state.selectedModel]) {
        const model = MODELS[state.selectedModel];
        elements.currentModel.textContent = model.name;
        elements.modelCost.textContent = `输入: $${model.inputCost}/M | 输出: $${model.outputCost}/M | 上下文: ${model.context}`;
    } else {
        elements.currentModel.textContent = '未选择模型';
        elements.modelCost.textContent = '请在设置中选择模型';
    }
}

function updateImageUploadButton() {
    const canUploadImage = state.selectedModel && MODELS[state.selectedModel]?.vision;
    elements.uploadImageBtn.disabled = !canUploadImage;
    elements.uploadImageBtn.title = canUploadImage ? '上传图片' : '当前模型不支持图片';
}

// ========== Image Handling ==========
function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file) {
        processImageFile(file);
    }
}

function handlePaste(e) {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let item of items) {
        if (item.type.indexOf('image') !== -1) {
            e.preventDefault();
            const blob = item.getAsFile();
            processImageFile(blob);
            break;
        }
    }
}

function processImageFile(file) {
    if (!state.selectedModel || !MODELS[state.selectedModel]?.vision) {
        alert('当前选择的模型不支持图片理解，请选择支持图片的模型（如 GPT-5系列、Claude 4.5、Gemini 等）');
        return;
    }

    if (file.size > CONFIG.MAX_IMAGE_SIZE) {
        alert(`图片大小不能超过 ${CONFIG.MAX_IMAGE_SIZE / 1024 / 1024}MB`);
        return;
    }

    if (!file.type.match(/^image\/(jpeg|png|gif|webp)$/)) {
        alert('只支持 JPG, PNG, GIF, WebP 格式的图片');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        state.currentImage = e.target.result;
        showImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
}

function showImagePreview(dataUrl) {
    elements.imagePreviewArea.style.display = 'block';
    elements.imagePreviewContainer.innerHTML = `
        <div class="image-preview-item">
            <img src="${dataUrl}" class="image-preview-thumb" onclick="viewImage('${dataUrl}')">
            <button class="image-preview-remove" onclick="removeImage()">✕</button>
        </div>
    `;
}

function removeImage() {
    state.currentImage = null;
    elements.imagePreviewArea.style.display = 'none';
    elements.imagePreviewContainer.innerHTML = '';
}

function viewImage(dataUrl) {
    elements.viewerImage.src = dataUrl;
    elements.imageViewer.style.display = 'flex';
}

// ========== Chat Functions ==========
async function sendMessage() {
    const message = elements.messageInput.value.trim();

    if (!message && !state.currentImage) {
        return;
    }

    if (!state.apiKey) {
        alert('请先在设置中配置 API Key！');
        openSettings();
        return;
    }

    if (!state.selectedModel) {
        alert('请先在设置中选择模型！');
        openSettings();
        return;
    }

    if (state.isStreaming) {
        return;
    }

    const userMessage = {
        role: 'user',
        content: message,
        image: state.currentImage,
        timestamp: new Date().toISOString()
    };

    state.chatHistory.push(userMessage);
    renderUserMessage(userMessage);
    saveChatHistory();

    elements.messageInput.value = '';
    removeImage();

    await callAPI();
}

async function callAPI() {
    state.isStreaming = true;
    elements.sendBtn.disabled = true;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant';
    typingDiv.innerHTML = '<div class="message-content typing-indicator">AI 正在思考</div>';
    elements.messages.appendChild(typingDiv);
    scrollToBottom();

    try {
        const messages = state.chatHistory.map(msg => {
            if (msg.image) {
                return {
                    role: msg.role,
                    content: [
                        { type: 'text', text: msg.content },
                        { type: 'image_url', image_url: { url: msg.image } }
                    ]
                };
            } else {
                return {
                    role: msg.role,
                    content: msg.content
                };
            }
        });

        const response = await fetch(CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${state.apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.href,
                'X-Title': 'Win98 Chatbot'
            },
            body: JSON.stringify({
                model: state.selectedModel,
                messages: messages,
                stream: true
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        typingDiv.remove();

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantMessage = '';
        let messageDiv = null;

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices?.[0]?.delta?.content;

                        if (content) {
                            assistantMessage += content;

                            if (!messageDiv) {
                                messageDiv = document.createElement('div');
                                messageDiv.className = 'message assistant';
                                messageDiv.innerHTML = '<div class="message-content"></div>';
                                elements.messages.appendChild(messageDiv);
                            }

                            messageDiv.querySelector('.message-content').textContent = assistantMessage;
                            scrollToBottom();
                        }
                    } catch (e) {
                        // Ignore parse errors
                    }
                }
            }
        }

        if (assistantMessage) {
            const aiMessage = {
                role: 'assistant',
                content: assistantMessage,
                timestamp: new Date().toISOString()
            };
            state.chatHistory.push(aiMessage);
            saveChatHistory();
        }

    } catch (error) {
        console.error('API Error:', error);
        typingDiv.remove();
        addSystemMessage(`错误: ${error.message}`);
    } finally {
        state.isStreaming = false;
        elements.sendBtn.disabled = false;
    }
}

function renderUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';

    let content = `<div class="message-content">${escapeHtml(message.content)}`;

    if (message.image) {
        content += `<br><img src="${message.image}" class="message-image" onclick="viewImage('${message.image}')">`;
    }

    content += '</div>';
    messageDiv.innerHTML = content;

    elements.messages.appendChild(messageDiv);
    scrollToBottom();
}

function renderChatHistory() {
    elements.messages.innerHTML = '';

    state.chatHistory.forEach(msg => {
        if (msg.role === 'user') {
            renderUserMessage(msg);
        } else {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message assistant';
            messageDiv.innerHTML = `<div class="message-content">${escapeHtml(msg.content)}</div>`;
            elements.messages.appendChild(messageDiv);
        }
    });

    scrollToBottom();
}

function addSystemMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'system-message';
    messageDiv.textContent = text;
    elements.messages.appendChild(messageDiv);
    scrollToBottom();
}

function scrollToBottom() {
    elements.messages.scrollTop = elements.messages.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========== Export Chat ==========
function exportChat() {
    if (state.chatHistory.length === 0) {
        alert('没有聊天记录可导出！');
        return;
    }

    const now = new Date();
    const timestamp = now.toLocaleString('zh-CN');
    const filename = `chatbot_export_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}.md`;

    let markdown = `# Win98 Chatbot - 聊天记录\n\n`;
    markdown += `导出时间：${timestamp}\n`;
    markdown += `使用模型：${MODELS[state.selectedModel]?.name || state.selectedModel}\n\n`;
    markdown += `---\n\n`;

    state.chatHistory.forEach(msg => {
        const role = msg.role === 'user' ? '用户' : 'AI';
        markdown += `## ${role}\n\n`;

        if (msg.image) {
            markdown += `![图片](${msg.image})\n\n`;
        }

        if (msg.content) {
            markdown += `${msg.content}\n\n`;
        }
    });

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    addSystemMessage('聊天记录已导出！');
    closeAllMenus();
}

// ========== Clear History ==========
function clearHistory() {
    if (confirm('确定要清除所有聊天记录吗？此操作不可恢复！')) {
        state.chatHistory = [];
        saveChatHistory();
        elements.messages.innerHTML = '<div class="system-message">聊天记录已清除。</div>';
        addSystemMessage('欢迎使用 Windows 98 风格 AI Chatbot！');
    }
    closeAllMenus();
}

// ========== Clock ==========
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    elements.clock.textContent = `${hours}:${minutes}`;
}

// ========== Start Application ==========
init();

// ========== Window Resize ==========
function makeResizable(element) {
    const handles = element.querySelectorAll('.resize-handle');
    const ASPECT_RATIO = 600 / 500; // 1.2
    const MIN_WIDTH = 400;
    const MIN_HEIGHT = MIN_WIDTH / ASPECT_RATIO;

    handles.forEach(handle => {
        const corner = handle.classList[1]; // resize-nw, resize-ne, etc.

        handle.addEventListener('mousedown', (e) => {
            if (state.chatWindowState.isMaximized) return; // Don't resize when maximized

            e.preventDefault();
            e.stopPropagation();

            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = element.offsetWidth;
            const startHeight = element.offsetHeight;
            const startLeft = element.offsetLeft;
            const startTop = element.offsetTop;

            function onMouseMove(e) {
                let newWidth, newHeight, newLeft = startLeft, newTop = startTop;

                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                // Calculate new width based on corner direction
                if (corner.includes('e')) { // East (right)
                    newWidth = startWidth + dx;
                } else { // West (left)
                    newWidth = startWidth - dx;
                }

                // Calculate height to maintain aspect ratio
                newHeight = newWidth / ASPECT_RATIO;

                // Apply minimum constraints
                if (newWidth < MIN_WIDTH || newHeight < MIN_HEIGHT) {
                    return;
                }

                // Adjust position for west corners (left side)
                if (corner.includes('w')) {
                    newLeft = startLeft + (startWidth - newWidth);
                }

                // Adjust position for north corners (top)
                if (corner.includes('n')) {
                    newTop = startTop + (startHeight - newHeight);
                }

                // Apply new dimensions
                element.style.width = newWidth + 'px';
                element.style.height = newHeight + 'px';
                element.style.left = newLeft + 'px';
                element.style.top = newTop + 'px';
            }

            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    });
}

// ========== Font Size Management ==========
function applyFontSize(size) {
    const messagesContainer = elements.messages;
    messagesContainer.className = messagesContainer.className.replace(/font-\w+/, '').trim();
    messagesContainer.classList.add('font-' + size);
}

function loadFontSize() {
    const savedSize = localStorage.getItem('win98_font_size') || 'medium';
    applyFontSize(savedSize);
    return savedSize;
}

function saveFontSize(size) {
    localStorage.setItem('win98_font_size', size);
}
