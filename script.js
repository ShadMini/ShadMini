marked.setOptions({ breaks: true, gfm: true });

const STORE = 'shadmini_v5';
let chats = JSON.parse(localStorage.getItem(STORE) || '{}');
let cid = null;
let abort = false, typingEl = null;

const $ = id => document.getElementById(id);
const chatList = $('chatList'), messages = $('messages'), chatTitle = $('chatTitle');
const msgInput = $('msgInput'), sendBtn = $('sendBtn'), stopBtn = $('stopBtn');
const newChatBtn = $('newChatBtn'), modelSelect = $('modelSelect');
const menuBtn = $('menuBtn'), sidebar = $('sidebar'), themeToggle = $('themeToggle');

function save() { localStorage.setItem(STORE, JSON.stringify(chats)); }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

function renderList() {
    chatList.innerHTML = '';
    Object.entries(chats).sort((a, b) => (b[1].ts || 0) - (a[1].ts || 0)).forEach(([id, c]) => {
        const d = document.createElement('div');
        d.className = 'chat-item' + (id === cid ? ' active' : '');
        d.innerHTML = `<span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.title || 'محادثة'}</span><button class="del">🗑️</button>`;
        d.onclick = e => {
            if (e.target.classList.contains('del')) { e.stopPropagation(); delChat(id); } else openChat(id);
        };
        chatList.appendChild(d);
    });
}

function openChat(id) {
    cid = id; const c = chats[id];
    chatTitle.textContent = c?.title || 'محادثة';
    renderMsgs(c?.messages || []);
    renderList(); sidebar.classList.remove('open');
}

function renderMsgs(msgs) {
    messages.innerHTML = '';
    msgs.forEach((m, i) => {
        const b = document.createElement('div');
        b.className = 'bubble ' + m.role;
        b.innerHTML = marked.parse(m.content);
        if (m.role === 'ai') {
            const acts = document.createElement('div');
            acts.className = 'btns';
            acts.innerHTML = '<button class="cp">📋</button><button class="re">🔄</button>';
            b.appendChild(acts);
            b.querySelector('.cp').onclick = () => navigator.clipboard.writeText(m.content);
            b.querySelector('.re').onclick = () => regen(i);
        }
        messages.appendChild(b);
    });
    messages.scrollTop = messages.scrollHeight;
}

async function typewrite(el, text, spd = 18) {
    el.innerHTML = ''; abort = false; typingEl = el;
    const words = text.split(/(\s+)/); let i = 0;
    return new Promise(res => {
        function t() {
            if (abort || i >= words.length) {
                if (abort) el.innerHTML += ' ⏹️';
                typingEl = null;
                res();
                return;
            }
            el.innerHTML += words[i]; i++;
            messages.scrollTop = messages.scrollHeight;
            setTimeout(t, spd);
        }
        t();
    });
}

async function send(txtOverride) {
    const txt = txtOverride || msgInput.value.trim();
    if (!txt) return;
    if (!cid || !chats[cid]) newChat();
    const c = chats[cid];
    c.messages.push({ role: 'user', content: txt }); c.ts = Date.now();
    if (c.title === 'محادثة جديدة') {
        c.title = txt.slice(0, 30) + (txt.length > 30 ? '…' : '');
        chatTitle.textContent = c.title;
    }
    save(); renderMsgs(c.messages); renderList();
    if (!txtOverride) msgInput.value = '';

    const aiB = document.createElement('div');
    aiB.className = 'bubble ai';
    aiB.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
    messages.appendChild(aiB); messages.scrollTop = messages.scrollHeight;
    sendBtn.style.display = 'none'; stopBtn.style.display = 'inline-block';

    try {
        const r = await fetch('/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: c.messages.map(m => ({ role: m.role, content: m.content })),
                model: modelSelect.value
            })
        });
        if (!r.ok) throw new Error(`خطأ ${r.status}`);
        const d = await r.json();
        const aiTxt = d.result || '⚠️ رد فارغ';
        await typewrite(aiB, aiTxt);
        if (!abort) {
            c.messages.push({ role: 'assistant', content: aiTxt });
            c.ts = Date.now();
            save();
            renderMsgs(c.messages);
            renderList();
        } else {
            c.messages.push({ role: 'assistant', content: aiB.textContent.replace(' ⏹️', '') });
            save();
        }
    } catch (e) {
        aiB.innerHTML = '❌ ' + e.message;
    } finally {
        sendBtn.style.display = 'inline-block';
        stopBtn.style.display = 'none';
        abort = false;
        typingEl = null;
    }
}

function stopGen() {
    abort = true;
    sendBtn.style.display = 'inline-block';
    stopBtn.style.display = 'none';
}

async function regen(i) {
    if (!cid) return;
    const c = chats[cid];
    c.messages = c.messages.slice(0, i);
    save();
    renderMsgs(c.messages);
    if (c.messages.length && c.messages[c.messages.length - 1].role === 'user')
        await send(c.messages[c.messages.length - 1].content);
}

function newChat() {
    const id = uid();
    chats[id] = { title: 'محادثة جديدة', messages: [], ts: Date.now() };
    save(); cid = id; openChat(id); msgInput.focus();
}

function delChat(id) {
    if (!confirm('حذف المحادثة؟')) return;
    delete chats[id]; save();
    const ids = Object.keys(chats);
    if (cid === id) ids.length ? openChat(ids[ids.length - 1]) : (cid = null, chatTitle.textContent = 'محادثة جديدة', renderMsgs([]));
    renderList();
}

// الأحداث
sendBtn.addEventListener('click', () => send());
stopBtn.addEventListener('click', stopGen);
newChatBtn.addEventListener('click', newChat);
menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
msgInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
});
msgInput.addEventListener('input', () => {
    msgInput.style.height = 'auto';
    msgInput.style.height = Math.min(msgInput.scrollHeight, 110) + 'px';
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const dk = document.body.classList.contains('dark');
    themeToggle.innerHTML = dk ? '<span>☀️</span><span>المظهر الفاتح</span>' : '<span>🌙</span><span>المظهر الداكن</span>';
    localStorage.setItem('theme', dk ? 'dark' : 'light');
});

chatTitle.addEventListener('dblclick', () => {
    const n = prompt('اسم جديد:', chatTitle.textContent);
    if (n && cid && chats[cid]) { chats[cid].title = n; save(); chatTitle.textContent = n; renderList(); }
});

document.addEventListener('click', e => {
    if (window.innerWidth <= 768 && !sidebar.contains(e.target) && e.target !== menuBtn)
        sidebar.classList.remove('open');
});

// تهيئة
(() => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeToggle.innerHTML = '<span>☀️</span><span>المظهر الفاتح</span>';
    }
    const ids = Object.keys(chats);
    if (ids.length) openChat(ids.sort((a, b) => (chats[b].ts || 0) - (chats[a].ts || 0))[0]);
    else newChat();
    renderList();
})();
