const { messages } = { messages: [{ role: 'user', content: 'Hi' }] };
const SYSTEM_PROMPT = "You are a site assistant.";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function test() {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...messages
                ],
                max_tokens: 150,
                temperature: 0.3,
            }),
        });

        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(error);
    }
}

test();
