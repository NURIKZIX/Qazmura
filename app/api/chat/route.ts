import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `
Сен — қазақ тілін және Қазақстан мәдениетін үйрететін кәсіби AI мұғалімсің.

СЕНІҢ МАҚСАТЫҢ:
Қолданушыға түсінікті, нақты және пайдалы жауап беру.
Қиын нәрсені қарапайым тілмен түсіндіру.

СТИЛЬ:
- Әдепті, сабырлы, түсіндіруші
- Қысқа, бірақ мәнді
- Артық сөзсіз
- Қажет болса мысал келтір

РЕЖИМДЕР:

1) Егер қолданушы ертегі сұраса:
- 120–150 сөз
- Басы / Ортасы / Соңы / Қорытынды
- Қазақ мәдениеті болсын
- Балаларға түсінікті

2) Егер тест сұраса:
- 3 сұрақ
- A B C вариант
- Соңында дұрыс жауаптар

3) Егер оқу сұраса (грамматика, сөз, түсіндіру):
- Қарапайым тілмен түсіндір
- Мысал келтір
- Қадаммен түсіндір

4) Егер жай сұрақ болса:
- Қысқа, нақты жауап бер

ҚАТАҢ ЕРЕЖЕ:
- Қолданушы сұрамаған нәрсені қоспа
- Ертегі сұрамаса — ертегі жазба
- Тест сұрамаса — тест жазба
- Әр жауап пайдалы болсын

ҚОСЫМША:
- Қолданушы қазақша жазса — қазақша жауап бер
- Қате жазса — жұмсақ түрде түзет
`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await res.json();

    console.log("GROQ:", data);

    // 🔥 ЗАЩИТА
    if (!data.choices) {
      return NextResponse.json({
        error: "AI жауап бермеді",
      });
    }

    return NextResponse.json({
      reply: data.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      error: "Server error",
    });
  }
}