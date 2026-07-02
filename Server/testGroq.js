import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'your-api-key-here' });

async function main() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'user', content: 'hello' },
        { role: 'user', content: 'how are you?' }, // Consecutive user messages
        { role: 'user', content: 'answer me' }
      ],
      model: 'llama-3.1-8b-instant',
    });
    console.log("Success:", chatCompletion.choices[0].message.content);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

main();
