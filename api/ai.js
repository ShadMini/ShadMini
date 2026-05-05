// ==========================================
// مكتبة النماذج الكاملة (22 نموذج مجاني)
// ==========================================
const MODELS_LIBRARY = {
    // ... (نفس النماذج السابقة بالضبط لا تغيير فيها) ...
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
    'llama-3.1-8b-cf': {
        provider: 'cloudflare',
        modelId: '@cf/meta/llama-3.1-8b-instruct',
        endpoint: `https://gateway.ai.cloudflare.com/v1/${process.env.CF_ACCOUNT_ID}/workers-ai/chat/completions`,
        auth: () => `Bearer ${process.env.CF_API_TOKEN}`,
        transform: (messages) => ({
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            stream: true,
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
            stream: true,
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
            stream: true,
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
            stream: true,
            model: '@cf/google/gemma-2b-it-lora'
        }),
        description: '📉 بيانات | خفيف',
    }
};

// دالة محولة للـ ReadableStream للتوافق مع Vercel
function nodeStreamToWebStream(nodeStream) {
    return new ReadableStream({
        start(controller) {
            nodeStream.on('data', chunk => {
                controller.enqueue(new TextEncoder().encode(chunk.toString()));
            });
            nodeStream.on('end', () => controller.close());
            nodeStream.on('error', err => controller.error(err));
        }
    });
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { messages, model = 'gpt-4o-mini', stream = true } = req.body;

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
            requestBody.stream = stream; // نتأكد من تمكين التدفق
        } else {
            requestBody = { model: modelConfig.modelId, messages: messages, stream: stream };
        }

        // استدعاء واجهة برمجة التطبيقات مع التدفق
        const response = await fetch(modelConfig.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': modelConfig.auth(),
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error ${response.status}: ${errorText}`);
        }

        // إذا طلب المستخدم تدفق، نعيد Stream
        if (stream && response.body) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            
            // للتعامل مع Vercel Serverless نحتاج لتحويل Node Readable إلى Web Readable
            // نستخدم ReadableStream مباشرة بدل node
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            
            res.writeHead(200);
            
            const pump = async () => {
                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) {
                            res.end();
                            break;
                        }
                        const chunk = decoder.decode(value, { stream: true });
                        // إرسال كل جزء كمقطع SSE
                        res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
                    }
                } catch (err) {
                    console.error('Stream error:', err);
                    res.end();
                }
            };
            
            pump();
            return;
        } else {
            // الطلب العادي بدون تدفق
            const data = await response.json();
            if (data.choices && data.choices[0] && data.choices[0].message) {
                return res.status(200).json({ result: data.choices[0].message.content });
            } else if (data.error) {
                throw new Error(data.error.message || "خطأ من الخادم");
            } else {
                throw new Error("لم يتم استلام رد صحيح");
            }
        }
    } catch (error) {
        console.error('خطأ في الخادم الوسيط:', error);
        return res.status(500).json({ error: error.message });
    }
        }
