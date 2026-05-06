/* =========================================================
   ShadMini AI — script.js  (Vercel + localStorage edition)
   تحسينات شاملة: تأثير كتابة، تنسيق Markdown، أزرار، ثيمات
   ========================================================= */

marked.setOptions({ breaks: true, gfm: true });
if (typeof hljs !== 'undefined') hljs.configure({ ignoreUnescapedHTML: true });

const LANG_ALIASES = {
  js: 'javascript', ts: 'typescript', py: 'python',
  rb: 'ruby', sh: 'bash', yml: 'yaml', md: 'markdown',
  cpp: 'c++', cs: 'c#', kt: 'kotlin',
};

function enhanceCodeBlocks(el) {
  el.querySelectorAll('pre:not(.enhanced)').forEach(pre => {
    pre.classList.add('enhanced');
    const codeEl = pre.querySelector('code');
    const rawText = codeEl ? codeEl.innerText : pre.innerText;
    if (codeEl && typeof hljs !== 'undefined') hljs.highlightElement(codeEl);
    let lang = '';
    if (codeEl) {
      const cls = [...codeEl.classList].find(c => c.startsWith('language-'));
      if (cls) { const raw = cls.replace('language-', '').toLowerCase(); lang = LANG_ALIASES[raw] || raw; }
    }
    const wrap = document.createElement('div');
    wrap.className = 'code-block-wrap';
    const toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';
    const label = document.createElement('span');
    label.className = 'code-lang-label';
    label.textContent = lang || 'code';
    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> نسخ الكود';
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(rawText);
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> تم النسخ';
        copyBtn.classList.add('copied');
        setTimeout(() => { copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> نسخ الكود'; copyBtn.classList.remove('copied'); }, 2000);
      } catch {}
    });
    toolbar.append(label, copyBtn);
    wrap.appendChild(toolbar);
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
  });
}

const chatWindow       = document.getElementById('chatWindow');
const userInput        = document.getElementById('userInput');
const sendBtn          = document.getElementById('sendBtn');
const stopBtn          = document.getElementById('stopBtn');
const newChatBtn       = document.getElementById('newChatBtn');
const chatsList        = document.getElementById('chatsList');
const themeToggle      = document.getElementById('themeToggle');
const themeIcon        = document.getElementById('themeIcon');
const modelSelect      = document.getElementById('modelSelect');
const hamburgerBtn     = document.getElementById('hamburgerBtn');
const sidebar          = document.getElementById('sidebar');
const sidebarOverlay   = document.getElementById('sidebarOverlay');
const chatTitleDisplay = document.getElementById('chatTitleDisplay');

const STORAGE_KEY = 'shadmini_chats_v6';
let chats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
let activeChatId = null;
let isGenerating = false;
let abortTyping = false;
let currentTypingElement = null;

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(chats)); }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

function renderChatList() {
  chatsList.innerHTML = '';
  const ids = Object.keys(chats).sort((a, b) => (chats[b].lastUpdated || 0) - (chats[a].lastUpdated || 0));
  if (ids.length === 0) {
    chatsList.innerHTML = '<p style="font-size:0.76rem;color:var(--text-muted);text-align:center;padding:1rem 0;">لا توجد محادثات</p>';
    return;
  }
  ids.forEach(id => {
    const chat = chats[id];
    const item = document.createElement('div');
    item.className = 'chat-item' + (id === activeChatId ? ' active' : '');
    const icon = document.createElement('i');
    icon.className = 'fa-regular fa-comment chat-item-icon';
    const nameSpan = document.createElement('span');
    nameSpan.className = 'chat-item-name';
    nameSpan.textContent = chat.title || 'محادثة';
    const delBtn = document.createElement('button');
    delBtn.className = 'chat-delete-btn';
    delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    item.append(icon, nameSpan, delBtn);
    item.addEventListener('click', () => switchChat(id));
    delBtn.addEventListener('click', (e) => { e.stopPropagation(); deleteChat(id); });
    nameSpan.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      const input = document.createElement('input');
      input.value = chat.title;
      nameSpan.textContent = '';
      nameSpan.appendChild(input);
      input.focus(); input.select();
      const commit = () => {
        const newTitle = input.value.trim() || 'محادثة جديدة';
        chat.title = newTitle;
        save();
        chatTitleDisplay.textContent = newTitle;
        renderChatList();
      };
      input.addEventListener('blur', commit);
      input.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') input.blur();
        if (ev.key === 'Escape') { input.value = chat.title; input.blur(); }
      });
    });
    chatsList.appendChild(item);
  });
}

function switchChat(id) {
  activeChatId = id;
  const chat = chats[id];
  chatTitleDisplay.textContent = chat?.title || 'محادثة جديدة';
  modelSelect.value = chat?.model || 'gpt-4o-mini';
  renderMessages();
  renderChatList();
  closeSidebar();
}

function renderMessages() {
  chatWindow.innerHTML = '';
  const chat = chats[activeChatId];
  if (!chat || !chat.messages || chat.messages.length === 0) {
    chatWindow.appendChild(buildWelcomeScreen());
    return;
  }
  chat.messages.forEach((msg, i) => {
    appendMessage(msg.role, msg.content, i, false);
  });
  scrollToBottom();
}

function buildWelcomeScreen() {
  const div = document.createElement('div');
  div.className = 'welcome-screen';
  div.innerHTML = `
    <div class="welcome-icon"><i class="fa-solid fa-microchip-ai"></i></div>
    <h2 class="welcome-title">مرحباً بك في ShadMini AI</h2>
    <p class="welcome-sub">مساعدك الذكي — اسأل أي شيء</p>
    <div class="welcome-suggestions">
      <button class="suggestion-chip" data-text="اشرح لي مفهوم الذكاء الاصطناعي بطريقة بسيطة"><i class="fa-solid fa-brain"></i> اشرح الذكاء الاصطناعي</button>
      <button class="suggestion-chip" data-text="اكتب لي كود Python لفرز قائمة أرقام"><i class="fa-solid fa-code"></i> كود Python</button>
      <button class="suggestion-chip" data-text="ترجم هذه الجملة إلى الإنجليزية: مرحباً كيف حالك؟"><i class="fa-solid fa-language"></i> ترجمة نص</button>
      <button class="suggestion-chip" data-text="اكتب لي مقالاً قصيراً عن فوائد القراءة"><i class="fa-solid fa-pen-nib"></i> كتابة مقال</button>
    </div>`;
  div.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      userInput.value = chip.dataset.text;
      handleSend();
    });
  });
  return div;
}

function appendMessage(role, content, index, animate = true) {
  const row = document.createElement('div');
  row.className = 'message-row ' + role;
  if (!animate) row.style.animation = 'none';
  if (role === 'user') {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = content;
    row.appendChild(bubble);
  } else {
    const inner = document.createElement('div');
    inner.className = 'ai-row-inner';
    const avatar = document.createElement('div');
    avatar.className = 'ai-avatar';
    avatar.innerHTML = '<i class="fa-solid fa-microchip-ai"></i>';
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    if (content) {
      bubble.innerHTML = marked.parse(content);
      enhanceCodeBlocks(bubble);
    }
    inner.append(avatar, bubble);
    row.appendChild(inner);
    if (content) row.appendChild(buildAiActions(content, index, row));
  }
  chatWindow.appendChild(row);
  return row;
}

function buildAiActions(content, index, row) {
  const actions = document.createElement('div');
  actions.className = 'ai-actions';
  const copyBtn = document.createElement('button');
  copyBtn.className = 'action-btn';
  copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> نسخ';
  copyBtn.addEventListener('click', async () => {
    await navigator.clipboard.writeText(content);
    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> تم';
    copyBtn.classList.add('copied');
    setTimeout(() => { copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> نسخ'; copyBtn.classList.remove('copied'); }, 2000);
  });
  const regenBtn = document.createElement('button');
  regenBtn.className = 'action-btn';
  regenBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> إعادة';
  regenBtn.addEventListener('click', () => {
    if (isGenerating) return;
    const chat = chats[activeChatId];
    if (!chat?.messages) return;
    chat.messages.splice(index, 1);
    save();
    renderMessages();
    sendToAI();
  });
  actions.append(copyBtn, regenBtn);
  return actions;
}

function showTypingIndicator() {
  const row = document.createElement('div');
  row.className = 'message-row ai';
  row.id = 'typingRow';
  const inner = document.createElement('div');
  inner.className = 'ai-row-inner';
  const avatar = document.createElement('div');
  avatar.className = 'ai-avatar';
  avatar.innerHTML = '<i class="fa-solid fa-microchip-ai"></i>';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerHTML = '<div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
  inner.append(avatar, bubble);
  row.appendChild(inner);
  chatWindow.appendChild(row);
  scrollToBottom();
  return { row, bubble };
}

function removeTypingIndicator() {
  const el = document.getElementById('typingRow');
  if (el) el.remove();
}

function scrollToBottom() {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function typewrite(element, text, speed = 15) {
  element.innerHTML = '';
  abortTyping = false;
  currentTypingElement = element;
  const words = text.split(/(\s+)/);
  let i = 0;
  return new Promise(resolve => {
    function type() {
      if (abortTyping || i >= words.length) {
        if (abortTyping) element.innerHTML += ' ⏹️';
        resolve();
        currentTypingElement = null;
        return;
      }
      element.innerHTML += words[i];
      i++;
      scrollToBottom();
      setTimeout(type, speed);
    }
    type();
  });
}

async function handleSend() {
  const text = userInput.value.trim();
  if (!text || isGenerating) return;

  if (!activeChatId || !chats[activeChatId]) {
    createNewChat();
  }

  const chat = chats[activeChatId];
  chat.messages.push({ role: 'user', content: text });
  chat.lastUpdated = Date.now();
  if (chat.title === 'محادثة جديدة') {
    chat.title = text.slice(0, 40) + (text.length > 40 ? '…' : '');
    chatTitleDisplay.textContent = chat.title;
  }
  save();
  renderMessages();
  renderChatList();
  userInput.value = '';
  userInput.style.height = 'auto';

  await sendToAI();
}

async function sendToAI() {
  const chat = chats[activeChatId];
  if (!chat) return;
  isGenerating = true;
  sendBtn.disabled = true;
  stopBtn.style.display = 'flex';

  const { row, bubble } = showTypingIndicator();

  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: chat.messages.map(m => ({ role: m.role, content: m.content })),
        model: modelSelect.value
      })
    });
    removeTypingIndicator();
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const data = await res.json();
    const aiText = data.result || '⚠️ رد فارغ';

    const aiRow = appendMessage('assistant', '', chat.messages.length);
    const aiBubble = aiRow.querySelector('.bubble');
    await typewrite(aiBubble, aiText, 15);
    const finalText = aiBubble.textContent.replace(' ⏹️', '');
    chat.messages.push({ role: 'assistant', content: finalText });
    chat.lastUpdated = Date.now();
    save();
    aiRow.querySelector('.ai-actions')?.remove();
    aiRow.appendChild(buildAiActions(finalText, chat.messages.length - 1, aiRow));
    enhanceCodeBlocks(aiBubble);
    renderChatList();
  } catch (err) {
    removeTypingIndicator();
    const errorRow = appendMessage('assistant', '', chat.messages.length);
    errorRow.querySelector('.bubble').innerHTML = `<span style="color:var(--red)">❌ ${err.message}</span>`;
  } finally {
    isGenerating = false;
    sendBtn.disabled = false;
    stopBtn.style.display = 'none';
    abortTyping = false;
    currentTypingElement = null;
  }
}

function stopGeneration() {
  if (isGenerating) {
    abortTyping = true;
    isGenerating = false;
    sendBtn.disabled = false;
    stopBtn.style.display = 'none';
  }
}

function createNewChat() {
  const id = uid();
  chats[id] = {
    title: 'محادثة جديدة',
    messages: [],
    model: 'gpt-4o-mini',
    lastUpdated: Date.now()
  };
  save();
  activeChatId = id;
  switchChat(id);
  userInput.focus();
}

function deleteChat(id) {
  if (!confirm('هل تريد حذف هذه المحادثة؟')) return;
  delete chats[id];
  save();
  if (activeChatId === id) {
    const remaining = Object.keys(chats);
    if (remaining.length) switchChat(remaining[0]);
    else createNewChat();
  }
  renderChatList();
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
}

sendBtn.addEventListener('click', handleSend);
stopBtn.addEventListener('click', stopGeneration);
newChatBtn.addEventListener('click', createNewChat);
hamburgerBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  sidebarOverlay.classList.toggle('active');
});
sidebarOverlay.addEventListener('click', closeSidebar);

userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeIcon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.getElementById('hljs-dark').disabled = !isDark;
  document.getElementById('hljs-light').disabled = isDark;
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.remove('dark-mode');
  document.body.classList.add('light-mode');
  themeIcon.className = 'fa-solid fa-sun';
  document.getElementById('hljs-dark').disabled = true;
  document.getElementById('hljs-light').disabled = false;
}

(function init() {
  const ids = Object.keys(chats);
  if (ids.length > 0) {
    const sorted = ids.sort((a, b) => (chats[b].lastUpdated || 0) - (chats[a].lastUpdated || 0));
    switchChat(sorted[0]);
  } else {
    createNewChat();
  }
  renderChatList();
})();
