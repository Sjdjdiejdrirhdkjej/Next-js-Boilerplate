import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import z from 'zod';

const promptSchema = z.object({
  prompt: z.string(),
});

export const POST = async (request: Request) => {
  const json = await request.json();
  const parse = promptSchema.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(z.treeifyError(parse.error), { status: 422 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'Gemini API key not configured' },
      { status: 500 },
    );
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  try {
    const result = await model.generateContent(parse.data.prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to generate content from Gemini' },
      { status: 500 },
    );
  }
};
