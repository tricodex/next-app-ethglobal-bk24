// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, agentContext } = body;

    const systemPrompt = agentContext.systemPrompt + `\n\nAdditional Context:
- Agent Name: ${agentContext.name}
- Capabilities: ${agentContext.capabilities?.join(', ')}
- Behavior: ${agentContext.behavior}
- Network: Base Sepolia
- Status: Active and ready to execute transactions`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 500
    });

    return NextResponse.json({
      success: true,
      message: completion.choices[0]?.message?.content || "No response generated"
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to generate response'
      },
      { status: 500 }
    );
  }
}