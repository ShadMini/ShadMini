// ==========================================
// مكتبة النماذج الكاملة (22 نموذج مجاني)
// ==========================================
const MODELS_LIBRARY = {
    'gpt-4o-mini': {
        provider: 'github', modelId: 'gpt-4o-mini',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'deepseek-r1': {
        provider: 'github', modelId: 'DeepSeek-R1',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'llama-3.3-70b': {
        provider: 'github', modelId: 'Llama-3.3-70B-Instruct',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'mistral-large': {
        provider: 'github', modelId: 'Mistral-Large-2411',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'phi-3.5-mini': {
        provider: 'github', modelId: 'Phi-3.5-mini-instruct',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'phi-3.5-moe': {
        provider: 'github', modelId: 'Phi-3.5-MoE-instruct',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'llama-3.2-90b': {
        provider: 'github', modelId: 'Llama-3.2-90B-Vision-Instruct',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'gemma-2-27b': {
        provider: 'github', modelId: 'Gemma-2-27b-it',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'aya-expanse-8b': {
        provider: 'github', modelId: 'Aya-Expanse-8b',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'ministral-3b': {
        provider: 'github', modelId: 'Ministral-3b',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'phi-4': {
        provider: 'github', modelId: 'Phi-4',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'deepseek-coder-v2': {
        provider: 'github', modelId: 'DeepSeek-Coder-V2-Lite-Instruct',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'codestral': {
        provider: 'github', modelId: 'Codestral-Latest',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'llama-3.1-8b': {
        provider: 'github', modelId: 'Llama-3.1-8B-Instruct',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'gpt-4.1-nano': {
        provider: 'github', modelId: 'gpt-4.1-nano',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'jais-30b': {
        provider: 'github', modelId: 'jais-30b-chat',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'cohere-command-r7b': {
        provider: 'github', modelId: 'Cohere-command-r7b',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    'mistral-nemo': {
        provider: 'github', modelId: 'Mistral-Nemo',
        endpoint: 'https://models.inference.ai.azure.com/chat/completions',
        auth: () => `Bearer ${process.env.GITHUB_TOKEN}`,
    },
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

        const response = await fetch(modelConfig.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': modelConfig.auth(),
            },
            body: JSON.stringify({
                model: modelConfig.modelId,
                messages: messages,
                // لا نرسل stream: true
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        if (data.choices && data.choices[0] && data.choices[0].message) {
            return res.status(200).json({ result: data.choices[0].message.content });
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
