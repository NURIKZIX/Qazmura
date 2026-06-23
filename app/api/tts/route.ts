// src/app/api/tts/route.ts

import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

const execFileAsync = promisify(execFile);

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text required" },
        { status: 400 }
      );
    }

    const fileName = `tts-${Date.now()}.mp3`;
    const outputPath = path.join(
      process.cwd(),
      "public",
      fileName
    );

    await execFileAsync("python3", [
      "-m",
      "edge_tts",
      "--voice",
      "kk-KZ-AigulNeural",
      "--text",
      text,
      "--write-media",
      outputPath,
    ]);

    const audioBuffer = await fs.readFile(outputPath);

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error: any) {
  console.error("EDGE TTS ERROR FULL");
  console.error("STDOUT:", error?.stdout);
  console.error("STDERR:", error?.stderr);
  console.error("ERROR:", error);

  return NextResponse.json(
    {
      stdout: error?.stdout,
      stderr: error?.stderr,
      error: String(error),
    },
    { status: 500 }
  );
  }
}