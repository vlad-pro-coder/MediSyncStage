// src/ChatGPTService.ts
const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "INSERT CHATGPT API KEY HERE";

export async function sendChatGPTRequest(prompt: string): Promise<string> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
        }),
    });

    const data = await response.json();

    if (response.ok) {
        return data.choices[0].message.content.trim();
    } else {
        throw new Error(data.error.message);
    }
}
