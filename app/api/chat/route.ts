// src/app/api/chat/route.ts
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let incomingMessages = body.messages || [];

    if (body.message && incomingMessages.length === 0) {
      incomingMessages = [{ role: "user", content: body.message }];
    }

    const systemInstruction = {
      role: "system",
      content: `Сен QAZMURA платформасының AI қазақ тілі мұғалімі және кәсіби ертегішісісің.
Міндеттерің:
1. Пайдаланушы қазақ тілін үйрену үшін сұрақ қойса, қарапайым әрі түсінікті етіп түсіндір.
2. Егер пайдаланушы грамматикалық қате жіберсе (мысалы: "Мен мектеп бардым"), оны міндетті түрде түзетіп ("Мен мектепке бардым"), ережесін түсіндір.
3. Пайдаланушы "ертегі жаз" десе, тәрбиелік мәні бар қызықты ертегі құрастыр. Ең бірінші жолға тек ертегі атауын жаз.
4. Пайдаланушы "тест жаса" десе, тақырыпқа сай 10 сұрақтық интерактивті тест құрастыр.
5. Қазақ мәдениетін, салт-дәстүрін және батырлар жырын насихатта.
Барлық жауапты Markdown форматында, таза және әдемі құрылымда тек қазақ тілінде қайтар.`,
    };

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://qazmura.vercel.app",
        "X-Title": "QAZMURA",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [systemInstruction, ...incomingMessages],
        temperature: 0.7,
        max_tokens: 1500,
        stream: true,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("OpenRouter API Error:", errorData);
      return NextResponse.json(
        { error: "OpenRouter API-ден қате келді" },
        { status: res.status }
      );
    }

    return new NextResponse(res.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Ішкі серверлік қате" },
      { status: 500 }
    );
  }
}