import { SYSTEM_PROMPT } from '@/lib/chatSystemPrompt';
import https from 'https';

const agent = new https.Agent({ rejectUnauthorized: false });

export async function POST(request) {
  try {
    const { messages } = await request.json();

    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const deployment = process.env.AZURE_OPENAI_FAST_DEPLOYMENT;
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION;

    if (!endpoint || !apiKey || !deployment) {
      return Response.json(
        { error: 'Azure OpenAI not configured' },
        { status: 500 }
      );
    }

    const url = `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

    const fetchWithAgent = (url, options) => {
      const { hostname, pathname, search } = new URL(url);
      return new Promise((resolve, reject) => {
        const req = https.request(
          {
            hostname,
            path: pathname + search,
            method: options.method || 'GET',
            headers: options.headers || {},
            agent,
          },
          (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
              resolve({
                ok: res.statusCode >= 200 && res.statusCode < 300,
                status: res.statusCode,
                json: () => JSON.parse(data),
                text: () => data,
              });
            });
          }
        );
        req.on('error', reject);
        if (options.body) req.write(options.body);
        req.end();
      });
    };

    const response = await fetchWithAgent(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
        max_completion_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Azure OpenAI error:', response.status, errorText);
      return Response.json(
        { error: 'AI service unavailable' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      'क्षमा करें, मैं अभी जवाब देने में असमर्थ हूँ। कृपया 8299200015 पर कॉल करें।';

    return Response.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
