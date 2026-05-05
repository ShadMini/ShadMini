export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // نتوقع الآن استلام "messages" وهي مصفوفة تحتوي على كل تاريخ المحادثة
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'الرجاء إرسال سجل المحادثة (messages)' });
        }

        const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: messages  // نمرر المصفوفة كاملة
            })
        });

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
