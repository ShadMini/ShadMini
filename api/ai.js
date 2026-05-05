// ==========================================
// مكتبة النماذج الكاملة (20+ نموذج مجاني)
// ==========================================
const MODELS_LIBRARY = {
    // ========== GITHUB MODELS ==========
    'gpt-4o-mini': {
        provider: 'github',
        modelId: 'gpt-4o-mini',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '⚡ عام | مساعد سريع',
    },
    'deepseek-r1': {
        provider: 'github',
        modelId: 'DeepSeek-R1',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '🧠 منطق | تحليل عميق',
    },
    'llama-3.3-70b': {
        provider: 'github',
        modelId: 'Llama-3.3-70B-Instruct',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '🦙 باك-إند | كود إبداعي',
    },
    'mistral-large': {
        provider: 'github',
        modelId: 'Mistral-Large-2411',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '🌪️ ديف أوبس | تعليمات',
    },
    'phi-3.5-mini': {
        provider: 'github',
        modelId: 'Phi-3.5-mini-instruct',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '📱 موبايل | خفيف',
    },
    'phi-3.5-moe': {
        provider: 'github',
        modelId: 'Phi-3.5-MoE-instruct',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '🧩 فول-ستاك | معقد',
    },
    'llama-3.2-90b': {
        provider: 'github',
        modelId: 'Llama-3.2-90B-Vision-Instruct',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '👁️ رؤية | صور',
    },
    'gemma-2-27b': {
        provider: 'github',
        modelId: 'Gemma-2-27b-it',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '📊 بيانات | محلل',
    },
    'aya-expanse-8b': {
        provider: 'github',
        modelId: 'Aya-Expanse-8b',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '🌍 متعدد اللغات',
    },
    'ministral-3b': {
        provider: 'github',
        modelId: 'Ministral-3b',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '⚡ فائق السرعة',
    },
    'phi-4': {
        provider: 'github',
        modelId: 'Phi-4',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '🔬 علوم | دقيق',
    },
    'deepseek-coder-v2': {
        provider: 'github',
        modelId: 'DeepSeek-Coder-V2-Lite-Instruct',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '💻 فرونت-إند | كود',
    },
    'codestral': {
        provider: 'github',
        modelId: 'Codestral-Latest',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '🛠️ فول-ستاك | كود',
    },
    'llama-3.1-8b': {
        provider: 'github',
        modelId: 'Llama-3.1-8B-Instruct',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '📝 عام | خفيف',
    },
    'gpt-4.1-nano': {
        provider: 'github',
        modelId: 'gpt-4.1-nano',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '⚡ خارق السرعة',
    },
    'jais-30b': {
        provider: 'github',
        modelId: 'jais-30b-chat',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: 'عربي | جيس 30B',
    },
    'cohere-command-r7b': {
        provider: 'github',
        modelId: 'Cohere-command-r7b',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '🔒 أمن سيبراني',
    },
    'mistral-nemo': {
        provider: 'github',
        modelId: 'Mistral-Nemo',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
        description: '☁️ كلاود | مهندس',
    },

    // ========== CLOUDFLARE WORKERS AI ==========
    'llama-3.1-8b-cf': {
        provider: 'cloudflare',
        modelId: '@cf/meta/llama-3.1-8b-instruct',
        endpoint: `https://gateway.ai.cloudflare.com/v1/${process.env.CF_ACCOUNT_ID}/workers-ai/chat/completions`,
        auth: () => `Bearer ${process.env.CF_API_TOKEN}`,
        transform: (messages) => ({
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            model: '@cf/meta/llama-3.1-8b-instruct'
        }),
        description: '☁️ ضمان الجودة',
    },
    'llama-2-7b-cf': {
        provider: 'cloudflare',
        modelId: '@cf/meta/llama-2-7b-chat-fp16',
        endpoint: `https://gateway.ai.cloudflare.com/v1/${process.env.CF_ACCOUNT_ID}/workers-ai/chat/completions`,
        auth: () => `Bearer ${process.env.CF_API_TOKEN}`,
        transform: (messages) => ({
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            model: '@cf/meta/llama-2-7b-chat-fp16'
        }),
        description: '🏗️ معماري | قديم',
    },
    'mistral-7b-cf': {
        provider: 'cloudflare',
        modelId: '@cf/mistral/mistral-7b-instruct-v0.1',
        endpoint: `https://gateway.ai.cloudflare.com/v1/${process.env.CF_ACCOUNT_ID}/workers-ai/chat/completions`,
        auth: () => `Bearer ${process.env.CF_API_TOKEN}`,
        transform: (messages) => ({
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            model: '@cf/mistral/mistral-7b-instruct-v0.1'
        }),
        description: '🧪 مختبر | تجارب',
    },
    'gemma-2b-cf': {
        provider: 'cloudflare',
        modelId: '@cf/google/gemma-2b-it-lora',
        endpoint: `https://gateway.ai.cloudflare.com/v1/${process.env.CF_ACCOUNT_ID}/workers-ai/chat/completions`,
        auth: () => `Bearer ${process.env.CF_API_TOKEN}`,
        transform: (messages) => ({
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            model: '@cf/google/gemma-2b-it-lora'
        }),
        description: '📉 بيانات | خفيف',
    }
};

// ==========================================
// الدالة الوسيطة (Handler)
// ==========================================
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { messages, model = 'gpt-4o-mini' } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'الرجاء إرسال سجل المحادثة (messages)' });
        }

        const modelConfig = MODELS_LIBRARY[model];
        if (!modelConfig) {
            const available = Object.keys(MODELS_LIBRARY).join(', ');
            return res.status(400).json({ error: `نموذج غير مدعوم: ${model}. النماذج المتاحة: ${available}` });
        }

        // بناء الطلب
        let requestBody;
        if (modelConfig.transform) {
            requestBody = modelConfig.transform(messages);
        } else {
            requestBody = { model: modelConfig.modelId, messages: messages };
        }

        // استدعاء واجهة برمجة التطبيقات
        const response = await fetch(modelConfig.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': modelConfig.auth(),
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        // التعامل مع الردود المختلفة
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return res.status(200).json({ result: data.choices[0].message.content });
        } else if (data.result && data.result.response) {
            // تنسيق Cloudflare المحتمل
            return res.status(200).json({ result: data.result.response });
        } else if (data.error) {
            throw new Error(data.error.message || "خطأ من الخادم");
        } else {
            throw new Error("لم يتم استلام رد صحيح");
        }

    } catch (error) {
        console.error('خطأ في الخادم الوسيط:', error);
        return res.status(500).json({ error: error.message });
    }
}
