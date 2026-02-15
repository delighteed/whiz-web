import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are a site assistant for Whiz.
Whiz is a calm, privacy-first nervous system support tool that helps people avoid burnout by signaling when to rest.

Your role:
- Answer basic questions about: How it works, Privacy, Demo, Waitlist.
- Help users navigate the site.
- Provide direct answers (1-3 sentences max).
- Be professional, calm, and concise. No emojis. No playful tone.

Key Links & Info:
- [Home/How it works](/): Main landing page.
- [Research](/research): Scientific foundation (Karoshi, neuro-aesthetics).
- [Privacy](/privacy): Details on neural data encryption and privacy-first approach.
- [Demo](/demo): Interactive preview of the concept.
- [Waitlist](#waitlist): Enrollment for private beta. (Use /?waitlist if they want to go there).

Constraint: No long conversations. No complex reasoning. If asked something unrelated, politely steer back to Whiz or navigation.
`;

export async function POST(request: Request) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            console.error('OPENAI_API_KEY is not defined');
            return NextResponse.json(
                { content: "OpenAI API key is missing. Please add OPENAI_API_KEY to your .env.local file." },
                { status: 500 }
            );
        }

        const { messages } = await request.json();

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
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

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenAI Error:', errorData);

            // Handle specific OpenAI error codes
            const errorCode = errorData.error?.code;
            let userMessage = "I'm sorry, I encountered an error. How else can I help you navigate?";
            let statusCode = 500;

            if (errorCode === 'insufficient_quota') {
                userMessage = "The AI service is currently unavailable due to quota limits. Please check back later or contact support.";
                statusCode = 402; // Payment Required / Quota Exceeded
            } else if (errorCode === 'rate_limit_exceeded') {
                userMessage = "Too many requests. Please wait a moment and try again.";
                statusCode = 429;
            }

            return NextResponse.json({ content: userMessage, error: errorCode }, { status: statusCode });
        }

        const data = await response.json();
        return NextResponse.json({ content: data.choices[0].message.content });

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ content: "Internal Server Error" }, { status: 500 });
    }
}
